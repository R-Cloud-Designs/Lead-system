export const environment = {
  production: true,
  database: {
    url: import.meta.env['DB_URL'],
    namespace: import.meta.env['DB_NAMESPACE'],
    database: import.meta.env['DB_DATABASE'],
    auth: {
      username: import.meta.env['DB_USERNAME'],
      password: import.meta.env['DB_PASSWORD'],
    },
  },
};
