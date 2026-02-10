#!/bin/bash
# Kind Kubernetes 測試編排腳本
# 用途：在 Kind 叢集中建置、部署並執行 Playwright 測試
# 使用方式：
#   bash scripts/kind-test.sh --smoke        # 冒煙測試
#   bash scripts/kind-test.sh --regression   # 回歸測試（BDD 全部）
#   bash scripts/kind-test.sh --full         # 完整測試（BDD + E2E）
#   bash scripts/kind-test.sh --clean        # 清理 K8s 資源
#   bash scripts/kind-test.sh --build-only   # 只建置映像

set -e

# ===== 設定 =====
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CLUSTER_NAME="${KIND_CLUSTER:-k10-poc}"
NAMESPACE="playwright-tests"
REPORT_DIR="$PROJECT_DIR/reports/k8s"
DEMO_APP_IMAGE="playwright-poc-demo-app:latest"
TEST_IMAGE="playwright-poc-test:latest"

MODE=""
SKIP_BUILD=false
SKIP_DEPLOY=false
GATE_THRESHOLD=95

# ===== 顏色輸出 =====
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info()  { echo -e "${BLUE}[INFO]${NC} $1"; }
log_ok()    { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ===== 解析參數 =====
while [[ $# -gt 0 ]]; do
  case $1 in
    --smoke)       MODE="smoke"; shift ;;
    --regression)  MODE="regression"; shift ;;
    --full)        MODE="full"; shift ;;
    --clean)       MODE="clean"; shift ;;
    --build-only)  MODE="build-only"; shift ;;
    --skip-build)  SKIP_BUILD=true; shift ;;
    --skip-deploy) SKIP_DEPLOY=true; shift ;;
    --cluster)     CLUSTER_NAME="$2"; shift 2 ;;
    --threshold)   GATE_THRESHOLD="$2"; shift 2 ;;
    --help)
      echo "Kind Kubernetes 測試編排腳本"
      echo ""
      echo "使用方式: bash scripts/kind-test.sh [選項]"
      echo ""
      echo "測試模式:"
      echo "  --smoke        冒煙測試（@smoke 標籤）"
      echo "  --regression   回歸測試（全部 BDD）"
      echo "  --full         完整測試（BDD + E2E）"
      echo "  --clean        清理所有 K8s 資源"
      echo "  --build-only   只建置 Docker 映像並載入叢集"
      echo ""
      echo "額外選項:"
      echo "  --skip-build   跳過映像建置（使用既有映像）"
      echo "  --skip-deploy  跳過部署步驟（已部署時使用）"
      echo "  --cluster NAME 指定 Kind 叢集名稱（預設: k10-poc）"
      echo "  --threshold N  Release Gate 通過率閾值（預設: 95）"
      echo "  --help         顯示此說明"
      exit 0
      ;;
    *) log_error "未知參數: $1"; exit 1 ;;
  esac
done

if [ -z "$MODE" ]; then
  log_error "請指定測試模式（--smoke / --regression / --full / --clean / --build-only）"
  echo "使用 --help 查看完整說明"
  exit 1
fi

# ===== 前置檢查 =====
check_prerequisites() {
  log_info "檢查前置條件..."

  if ! command -v docker &> /dev/null; then
    log_error "找不到 docker，請先安裝 Docker"
    exit 1
  fi

  if ! command -v kind &> /dev/null; then
    log_error "找不到 kind，請先安裝 Kind"
    exit 1
  fi

  if ! command -v kubectl &> /dev/null; then
    log_error "找不到 kubectl，請先安裝 kubectl"
    exit 1
  fi

  # 檢查叢集是否存在
  if ! kind get clusters 2>/dev/null | grep -q "^${CLUSTER_NAME}$"; then
    log_error "找不到 Kind 叢集 '${CLUSTER_NAME}'"
    log_info "可用叢集: $(kind get clusters 2>/dev/null | tr '\n' ', ')"
    log_info "或使用 'kind create cluster --config k8s/kind-cluster.yaml' 建立新叢集"
    exit 1
  fi

  # 設定 kubectl context
  kubectl cluster-info --context "kind-${CLUSTER_NAME}" &> /dev/null || {
    log_error "無法連線到叢集 kind-${CLUSTER_NAME}"
    exit 1
  }

  log_ok "前置條件檢查通過（叢集: ${CLUSTER_NAME}）"
}

# ===== 建置 Docker 映像 =====
build_images() {
  if [ "$SKIP_BUILD" = true ]; then
    log_warn "跳過映像建置（--skip-build）"
    return
  fi

  log_info "建置 Docker 映像..."

  # 建置 Demo App 映像
  log_info "建置 Demo App 映像: ${DEMO_APP_IMAGE}"
  docker build -t "$DEMO_APP_IMAGE" -f docker/Dockerfile.app "$PROJECT_DIR"

  # 建置測試映像
  log_info "建置測試映像: ${TEST_IMAGE}"
  docker build -t "$TEST_IMAGE" -f docker/Dockerfile "$PROJECT_DIR"

  log_ok "映像建置完成"
}

# ===== 載入映像到 Kind =====
load_images() {
  if [ "$SKIP_BUILD" = true ]; then
    log_warn "跳過映像載入（--skip-build）"
    return
  fi

  log_info "載入映像到 Kind 叢集..."

  kind load docker-image "$DEMO_APP_IMAGE" --name "$CLUSTER_NAME"
  kind load docker-image "$TEST_IMAGE" --name "$CLUSTER_NAME"

  log_ok "映像載入完成"
}

# ===== 部署基礎資源 =====
deploy_base() {
  if [ "$SKIP_DEPLOY" = true ]; then
    log_warn "跳過部署步驟（--skip-deploy）"
    return
  fi

  log_info "部署 Kubernetes 基礎資源..."

  # 建立 Namespace
  kubectl apply -f "$PROJECT_DIR/k8s/namespace.yaml"

  # 建立 ConfigMap 與 PVC
  kubectl apply -f "$PROJECT_DIR/k8s/test-configmap.yaml"
  kubectl apply -f "$PROJECT_DIR/k8s/test-pvc.yaml"

  # 部署 Demo App
  kubectl apply -f "$PROJECT_DIR/k8s/demo-app-deployment.yaml"
  kubectl apply -f "$PROJECT_DIR/k8s/demo-app-service.yaml"

  log_ok "基礎資源部署完成"
}

# ===== 等待 Demo App 就緒 =====
wait_for_app() {
  if [ "$SKIP_DEPLOY" = true ]; then
    log_warn "跳過等待步驟（--skip-deploy）"
    return
  fi

  log_info "等待 Demo App 就緒..."

  kubectl rollout status deployment/demo-app -n "$NAMESPACE" --timeout=120s

  # 確認 Pod 可連線
  kubectl wait --for=condition=ready pod -l app=demo-app -n "$NAMESPACE" --timeout=60s

  log_ok "Demo App 已就緒"
}

# ===== 清理舊 Job =====
cleanup_old_jobs() {
  log_info "清理舊的測試 Job..."

  kubectl delete job -l app=playwright-test -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null

  # 等待 Pod 完全終止
  sleep 2

  log_ok "舊 Job 已清理"
}

# ===== 執行測試 Job =====
run_test_job() {
  local JOB_TYPE=$1
  local JOB_FILE="$PROJECT_DIR/k8s/test-job-${JOB_TYPE}.yaml"

  if [ ! -f "$JOB_FILE" ]; then
    log_error "找不到 Job 定義檔: ${JOB_FILE}"
    exit 1
  fi

  log_info "建立測試 Job: test-${JOB_TYPE}"
  kubectl apply -f "$JOB_FILE"

  log_info "等待測試完成（可能需要數分鐘）..."

  # 等待 Job 完成（最多 10 分鐘）
  local TIMEOUT=600
  local ELAPSED=0
  local INTERVAL=5

  while [ $ELAPSED -lt $TIMEOUT ]; do
    # 檢查 Job 狀態（完成或失敗）
    local SUCCEEDED=$(kubectl get job "test-${JOB_TYPE}" -n "$NAMESPACE" -o jsonpath='{.status.succeeded}' 2>/dev/null || echo "")
    local FAILED_COUNT=$(kubectl get job "test-${JOB_TYPE}" -n "$NAMESPACE" -o jsonpath='{.status.failed}' 2>/dev/null || echo "")

    if [ "$SUCCEEDED" = "1" ]; then
      log_ok "測試 Job 完成（成功）"
      return 0
    elif [ -n "$FAILED_COUNT" ] && [ "$FAILED_COUNT" -ge 1 ] 2>/dev/null; then
      log_error "測試 Job 失敗"
      # 顯示 Pod 日誌
      log_info "=== Pod 日誌 ==="
      kubectl logs -l "test-type=${JOB_TYPE}" -n "$NAMESPACE" --tail=50 2>/dev/null || true
      return 1
    fi

    # 即時顯示進度
    if [ $((ELAPSED % 15)) -eq 0 ] && [ $ELAPSED -gt 0 ]; then
      log_info "已等待 ${ELAPSED} 秒..."
      # 顯示最新日誌
      kubectl logs -l "test-type=${JOB_TYPE}" -n "$NAMESPACE" --tail=3 2>/dev/null || true
    fi

    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))
  done

  log_error "測試 Job 逾時（${TIMEOUT} 秒）"
  kubectl logs -l "test-type=${JOB_TYPE}" -n "$NAMESPACE" --tail=30 2>/dev/null || true
  return 1
}

# ===== 收集報告 =====
collect_reports() {
  local JOB_TYPE=$1

  log_info "收集測試報告..."

  mkdir -p "$REPORT_DIR"

  # 建立暫時 helper Pod 掛載 PVC 來複製報告
  log_info "建立報告收集 helper Pod..."
  kubectl run report-collector \
    --image=busybox:latest \
    --restart=Never \
    --overrides='{
      "spec": {
        "containers": [{
          "name": "report-collector",
          "image": "busybox:latest",
          "command": ["sleep", "300"],
          "volumeMounts": [{
            "name": "reports",
            "mountPath": "/reports"
          }]
        }],
        "volumes": [{
          "name": "reports",
          "persistentVolumeClaim": {
            "claimName": "test-reports-pvc"
          }
        }]
      }
    }' \
    -n "$NAMESPACE" 2>/dev/null || true

  # 等待 helper Pod 就緒
  kubectl wait --for=condition=ready pod/report-collector -n "$NAMESPACE" --timeout=30s 2>/dev/null || {
    log_warn "Helper Pod 未就緒，跳過報告收集"
    kubectl delete pod report-collector -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null
    return
  }

  # 從 helper Pod 複製報告
  kubectl cp "${NAMESPACE}/report-collector:/reports/" "$REPORT_DIR/" 2>/dev/null || {
    log_warn "無法複製報告檔案"
  }

  # 清理 helper Pod
  kubectl delete pod report-collector -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null

  # 列出收集到的報告
  if [ -d "$REPORT_DIR" ] && [ "$(ls -A "$REPORT_DIR" 2>/dev/null)" ]; then
    log_ok "報告已收集到: $REPORT_DIR"
    ls -la "$REPORT_DIR/"
  else
    log_warn "未收集到報告檔案"
  fi
}

# ===== Release Gate 檢查 =====
run_gate_check() {
  local RESULTS_FILE="$REPORT_DIR/results.json"

  if [ ! -f "$RESULTS_FILE" ]; then
    log_warn "找不到 results.json，跳過 Release Gate 檢查"
    return 0
  fi

  log_info "執行 Release Gate 檢查（閾值: ${GATE_THRESHOLD}%）..."
  bash "$SCRIPT_DIR/release-gate-check.sh" "$RESULTS_FILE" "$GATE_THRESHOLD"
}

# ===== 清理所有資源 =====
clean_all() {
  log_info "清理所有 K8s 資源..."

  kubectl delete jobs -l app=playwright-test -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null || true
  kubectl delete deployment demo-app -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null || true
  kubectl delete service demo-app-svc -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null || true
  kubectl delete configmap test-config -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null || true
  kubectl delete pvc test-reports-pvc -n "$NAMESPACE" --ignore-not-found=true 2>/dev/null || true
  kubectl delete namespace "$NAMESPACE" --ignore-not-found=true 2>/dev/null || true

  log_ok "所有資源已清理"
}

# ===== 顯示測試摘要 =====
show_summary() {
  local JOB_TYPE=$1
  local EXIT_CODE=$2

  echo ""
  echo "========================================"
  echo "  Kind K8s 測試摘要"
  echo "========================================"
  echo "  叢集:     ${CLUSTER_NAME}"
  echo "  命名空間: ${NAMESPACE}"
  echo "  測試類型: ${JOB_TYPE}"
  echo "  報告目錄: ${REPORT_DIR}"

  if [ "$EXIT_CODE" -eq 0 ]; then
    echo -e "  結果:     ${GREEN}PASS${NC}"
  else
    echo -e "  結果:     ${RED}FAIL${NC}"
  fi

  echo "========================================"
  echo ""

  # 顯示完整 Pod 日誌
  log_info "=== 測試日誌 ==="
  kubectl logs -l "test-type=${JOB_TYPE}" -n "$NAMESPACE" 2>/dev/null || true
}

# ===== 主流程 =====
main() {
  echo ""
  echo "=========================================="
  echo "  Playwright Kind K8s 測試編排"
  echo "=========================================="
  echo ""

  cd "$PROJECT_DIR"

  case $MODE in
    clean)
      check_prerequisites
      clean_all
      exit 0
      ;;
    build-only)
      check_prerequisites
      build_images
      load_images
      log_ok "映像建置並載入完成"
      exit 0
      ;;
    smoke|regression|full)
      check_prerequisites
      build_images
      load_images
      deploy_base
      wait_for_app
      cleanup_old_jobs

      # 執行測試
      TEST_EXIT=0
      run_test_job "$MODE" || TEST_EXIT=$?

      # 收集報告
      collect_reports "$MODE"

      # 顯示摘要
      show_summary "$MODE" "$TEST_EXIT"

      # Release Gate 檢查
      if [ "$TEST_EXIT" -eq 0 ]; then
        run_gate_check || true
      fi

      exit $TEST_EXIT
      ;;
  esac
}

main
