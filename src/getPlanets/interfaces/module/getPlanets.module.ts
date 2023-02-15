import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../share/domain/resources/env.config';
import { GetPlanetsController } from '../controller/getPlanets.controller';
import { GetPlanetsService } from '../../application/getPlanets.service';
import { ExternalApiService } from '../../../getPlanets/infrastructure/callService/external-api.service';
import { HttpModule } from '@nestjs/axios';

/**
 *  @description clase anotada con un decorador @Module(). La cual permite administrar el controlador y proveedores para la
 *  operacion GetPlanetsModule.
 *
 *  @author Luis Torres
 *
 */
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [GetPlanetsController],
  providers: [GetPlanetsService, ExternalApiService],
})
export class GetPlanetsModule {}
