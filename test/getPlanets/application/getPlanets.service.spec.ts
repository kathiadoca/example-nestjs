import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';

import config from '../../../src/share/domain/resources/env.config';
import { ProcessTimeService } from '../../../src/share/domain/config/processTime.service';
import { GetPlanetsService } from '../../../src/getPlanets/application/getPlanets.service';
import { ExternalApiService } from '../../../src/getPlanets/infrastructure/callService/external-api.service';
import { ApiResponseDto } from '../../../src/share/domain/dto/apiResponse.dto';
import {
  OK,
  SERVICE_UNAVAILABLE,
} from '../../../src/share/domain/resources/constants';

jest.mock(
  '../../../src/getPlanets/infrastructure/callService/external-api.service',
);
describe('Service GetPlanet', () => {
  let service: GetPlanetsService;
  let externalApiService: ExternalApiService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlanetsService,
        ExternalApiService,
        {
          provide: 'TransactionId',
          useValue: '98#$vfk/Hd$36G',
        },
        ProcessTimeService,
      ],
      controllers: [],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
    }).compile();

    service = moduleRef.get<GetPlanetsService>(GetPlanetsService);
    externalApiService = moduleRef.get<ExternalApiService>(ExternalApiService);
  });

  describe('Service', () => {
    it('Started Service', async () => {
      expect(service).toBeDefined();
    });

    it('Return status 200', async () => {
      jest.spyOn(externalApiService, 'getAllPlanets').mockResolvedValue({
        count: 0,
        next: 'string',
        previous: 'string',
        results: [],
      });

      expect(service.getPlanets()).toEqual(
        Promise.resolve(new ApiResponseDto(HttpStatus.OK, OK, {})),
      );
    });
    it('Return status 503', async () => {
      jest
        .spyOn(externalApiService, 'getAllPlanets')
        .mockRejectedValue('Timeout');

      expect(service.getPlanets()).toEqual(
        Promise.resolve(
          new ApiResponseDto(
            HttpStatus.SERVICE_UNAVAILABLE,
            SERVICE_UNAVAILABLE,
          ),
        ),
      );
    });
  });
});
