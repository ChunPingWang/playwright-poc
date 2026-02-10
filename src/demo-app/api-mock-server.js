const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// --- Mock Data ---
const users = [
  { username: 'admin', password: 'admin123', name: '管理員', role: 'admin' },
  { username: 'user', password: 'user123', name: '一般使用者', role: 'user' },
  { username: 'test', password: 'test123', name: '測試帳號', role: 'tester' }
];

const dashboardData = {
  stats: {
    totalUsers: 1234,
    totalOrders: 567,
    revenue: 892300,
    satisfaction: 94.5
  },
  recentOrders: [
    { id: 'ORD-001', customer: '王大明', amount: 15000, status: 'active', date: '2025-01-15' },
    { id: 'ORD-002', customer: '李小華', amount: 8500, status: 'pending', date: '2025-01-14' },
    { id: 'ORD-003', customer: '張美麗', amount: 22000, status: 'inactive', date: '2025-01-13' },
    { id: 'ORD-004', customer: '陳志明', amount: 5600, status: 'active', date: '2025-01-12' },
    { id: 'ORD-005', customer: '林雅婷', amount: 18900, status: 'pending', date: '2025-01-11' }
  ]
};

// --- API Endpoints ---

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({
      success: true,
      user: { name: user.name, role: user.role },
      token: `mock-jwt-token-${Date.now()}`
    });
  } else {
    res.status(401).json({
      success: false,
      message: '帳號或密碼錯誤'
    });
  }
});

// Dashboard data
app.get('/api/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: '未授權' });
  }
  res.json(dashboardData);
});

// Get users list
app.get('/api/users', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: '未授權' });
  }
  res.json({
    success: true,
    data: users.map(u => ({ username: u.username, name: u.name, role: u.role }))
  });
});

// Create contact
app.post('/api/contacts', (req, res) => {
  const { firstName, lastName, email, phone, department, message } = req.body;

  if (!firstName || !lastName || !email || !department) {
    return res.status(400).json({
      success: false,
      message: '缺少必填欄位'
    });
  }

  res.json({
    success: true,
    data: {
      id: `CON-${Date.now()}`,
      firstName, lastName, email, phone, department, message,
      createdAt: new Date().toISOString()
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Default: redirect to login
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Demo App 啟動於 http://localhost:${PORT}`);
});

module.exports = { app, server };
