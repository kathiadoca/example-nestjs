import { registerAs } from '@nestjs/config';

/**
 *  @description Archivo de configuracion.
 *
 *  @author Luis Torres
 *
 */
export default registerAs('configuration', () => ({
  PORT: process.env.PORT,
  TIMEOUT: parseInt(process.env.TIMEOUT),
  URLEXTERNALAPI: process.env.URL_EXTERNAL_API,
  APM: {
    HOST: process.env.ELASTIC_APM_SERVER_URL,
    ENVIRONMENT: process.env.ELASTIC_APM_ENVIRONMENT,
    ISACTIVE: process.env.ELASTIC_APM_ACTIVE,
  },
}));
