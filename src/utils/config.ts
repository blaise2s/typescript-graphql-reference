export interface IConfiguration {
  port: number;
}

export const loadConfig: (env: string) => IConfiguration = (env) => {
  const baseConfig = {
    port: +(process.env.PORT || 4005),
  };

  if (env === "development") {
    return baseConfig;
  } else {
    return baseConfig;
  }
};
