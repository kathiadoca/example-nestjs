import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';

import {
  OK,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { ExternalApiService } from '../infrastructure/callService/external-api.service';
/**
 *  @description Clase servicio responsable realizar la logica requerida.
 *
 *  @author Luis Torres
 *
 */
@Injectable()
export class GetPlanetsService {
  private readonly logger = new Logger(GetPlanetsService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(private readonly externalApiService: ExternalApiService) {}

  public async getPlanets(): Promise<ApiResponseDto> {
    try {
      this.logger.log('procedimientoActivacion request', {
        request: '',
        transactionId: this.transactionId,
      });
      const responseService = await this.externalApiService.getAllPlanets();
      return new ApiResponseDto(HttpStatus.OK, OK, responseService);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
      );
    }
  }
}
