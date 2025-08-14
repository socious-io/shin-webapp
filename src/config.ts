export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL,
  accessExpire: import.meta.env.VITE_ACCESS_EXPIRE,
  refreshExpire: import.meta.env.VITE_REFRESH_EXPIRE,
  appBaseURL: import.meta.env.VITE_APP_URL,
  accountCenterURL: import.meta.env.VITE_ACCOUNT_CENTER_URL,
  logDiscordWebHook: import.meta.env.VITE_LOG_DISCORD_WEBHOOK,
};

export const isTestingEnvironment = config.env === 'test';
