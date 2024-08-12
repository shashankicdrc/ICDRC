import LoggerConfig from "#config/loggerConfig";

let winstonLoggerConfig = new LoggerConfig();

let logger;

process.env.NODE_ENV !== "production"
    ? (logger = winstonLoggerConfig.devlepmentConfig())
    : (logger = winstonLoggerConfig.productionConfig());

export default logger;
