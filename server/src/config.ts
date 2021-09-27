interface Config {
  googleClientId: string;
  googleClientSecret: string;
  dbUser: string;
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbPort: number;
  host: string;
  clientHost: string;
}

const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  dbUser: process.env.DB_USER as string,
  dbHost: process.env.DB_HOST as string,
  dbName: process.env.DB_NAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbPort: parseInt(process.env.DB_PORT as string),
  host: process.env.SERVER_HOST as string,
  clientHost: process.env.CLIENT_HOST as string
};

if (!config.googleClientId) {
  throw new Error("Google Client ID is missing");
}

if (!config.googleClientSecret) {
  throw new Error("Google Client Secret is missing");
}

if (!config.dbUser) {
  throw new Error("DB User is missing");
}

if (!config.dbHost) {
  throw new Error("DB Host is missing");
}

if (!config.dbName) {
  throw new Error("DB Name is missing");
}

if (!config.dbPassword) {
  throw new Error("DB Password is missing");
}

if (!config.dbPort) {
  throw new Error("Port is missing");
}

if (!config.host) {
  throw new Error("Server host is missing");
}

if (!config.clientHost) {
  throw new Error("Client host is missing")
}

export default config;
