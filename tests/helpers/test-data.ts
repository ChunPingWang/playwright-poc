/** 測試資料工廠 - 提供各種測試場景所需的資料 */

export interface LoginCredentials {
  username: string;
  password: string;
  expectedName?: string;
  shouldSucceed: boolean;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  message?: string;
}

/** 登入測試資料 */
export const loginTestData: LoginCredentials[] = [
  { username: 'admin', password: 'admin123', expectedName: '管理員', shouldSucceed: true },
  { username: 'user', password: 'user123', expectedName: '一般使用者', shouldSucceed: true },
  { username: 'test', password: 'test123', expectedName: '測試帳號', shouldSucceed: true },
  { username: 'admin', password: 'wrong', shouldSucceed: false },
  { username: 'nonexist', password: 'any', shouldSucceed: false },
  { username: '', password: '', shouldSucceed: false },
];

/** 表單測試資料 - 有效資料 */
export const validContactData: ContactFormData[] = [
  {
    firstName: '王', lastName: '大明',
    email: 'wang.daming@example.com', phone: '0912-345-678',
    department: 'engineering', message: '工程部同仁',
  },
  {
    firstName: '李', lastName: '小華',
    email: 'li.xiaohua@test.com',
    department: 'marketing', message: '行銷部新人',
  },
  {
    firstName: '張', lastName: '美麗',
    email: 'zhang@company.org', phone: '02-2345-6789',
    department: 'hr',
  },
];

/** 表單測試資料 - 無效電子郵件 */
export const invalidEmails = [
  'notanemail',
  '@missing-local.com',
  'missing-domain@',
  'spaces in@email.com',
  'double@@at.com',
];

/** 預設管理員帳號 */
export const defaultAdmin: LoginCredentials = {
  username: 'admin',
  password: 'admin123',
  expectedName: '管理員',
  shouldSucceed: true,
};

/** 取得隨機有效聯絡人資料 */
export function getRandomContact(): ContactFormData {
  const index = Math.floor(Math.random() * validContactData.length);
  return validContactData[index];
}
