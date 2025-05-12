module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: '/var/www/frontend',
      script: 'pnpm',
      args: 'start',
      env: {
        HOST: '127.0.0.1',
        PORT: '3000',
        NODE_ENV: 'production',
      },
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '1024M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
