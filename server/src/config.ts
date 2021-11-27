interface Config {
  googleClientId: string;
  googleClientSecret: string;
  databaseUrl: string;
  host: string;
  clientHost: string;
}

const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  databaseUrl: process.env.DATABASE_URL as string,
  host: process.env.SERVER_HOST as string,
  clientHost: process.env.CLIENT_HOST as string,
};

if (!config.googleClientId) {
  throw new Error("Google Client ID is missing");
}

if (!config.googleClientSecret) {
  throw new Error("Google Client Secret is missing");
}

if (!config.databaseUrl) {
  throw new Error("Missing DATABASE_URL env!");
}

if (!config.host) {
  throw new Error("Server host is missing");
}

if (!config.clientHost) {
  throw new Error("Client host is missing");
}

export default config;
