/** 環境設定 - 支援 SIT / UAT / Staging / Local */
export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  apiURL: string;
  timeout: number;
}

const environments: Record<string, EnvironmentConfig> = {
  local: {
    name: 'Local',
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3000/api',
    timeout: 30000,
  },
  sit: {
    name: 'SIT',
    baseURL: process.env.SIT_URL || 'https://sit.example.com',
    apiURL: process.env.SIT_URL ? `${process.env.SIT_URL}/api` : 'https://sit.example.com/api',
    timeout: 60000,
  },
  uat: {
    name: 'UAT',
    baseURL: process.env.UAT_URL || 'https://uat.example.com',
    apiURL: process.env.UAT_URL ? `${process.env.UAT_URL}/api` : 'https://uat.example.com/api',
    timeout: 60000,
  },
  staging: {
    name: 'Staging',
    baseURL: process.env.STAGING_URL || 'https://staging.example.com',
    apiURL: process.env.STAGING_URL ? `${process.env.STAGING_URL}/api` : 'https://staging.example.com/api',
    timeout: 60000,
  },
};

export function getEnvironment(): EnvironmentConfig {
  const env = process.env.TEST_ENV || 'local';
  const config = environments[env];
  if (!config) {
    throw new Error(`未知的測試環境: ${env}。可用環境: ${Object.keys(environments).join(', ')}`);
  }
  return config;
}

export default environments;
