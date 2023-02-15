import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigType } from '@nestjs/config';
import config from '../../../share/domain/resources/env.config';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { GetPlanetsResponse } from './getPlanetsResponse.dto';
import { plainToInstance } from 'class-transformer';

/**
 *  @description Clase servicio encargada realizar el llamado al servicio a la API.
 *
 *  @author Luis Torres
 *
 */
@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);
  @Inject('TransactionId') private readonly transactionId: string;
  constructor(
    private readonly httpService: HttpService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly processTimeService: ProcessTimeService,
  ) {}
  async getAllPlanets(): Promise<GetPlanetsResponse | ApiResponseDto> {
    try {
      const processTime = this.processTimeService.start();
      const responseConfig = await lastValueFrom(
        this.httpService.get(`${this.configService.URLEXTERNALAPI}/planets`),
      );
      this.logger.log('Consumo realizado con exito', {
        methodName: 'getAllPlanets',
        request: ``,
        processingTime: processTime.end(),
        transactionId: this.transactionId,
        response: responseConfig.data,
      });
      return plainToInstance(GetPlanetsResponse, responseConfig.data);
    } catch (error) {
      return new ApiResponseDto(
        HttpStatus.GATEWAY_TIMEOUT,
        'Gateway time out',
        '',
      );
    }
  }
}
