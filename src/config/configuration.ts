export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    mode: process.env.MODE,
  },
  jwt: {
    secret: process.env.SECRET_KEY,
    time_expired: process.env.EXPIRED_TOKEN,
  },
});
