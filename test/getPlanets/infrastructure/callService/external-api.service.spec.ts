import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

import config from '../../../../src/share/domain/resources/env.config';
import { ProcessTimeService } from '../../../../src/share/domain/config/processTime.service';
import { ExternalApiService } from '../../../../src/getPlanets/infrastructure/callService/external-api.service';
import { GetPlanetsResponse } from '../../../../src/getPlanets/infrastructure/callService/getPlanetsResponse.dto';

describe('External-Api Service ', () => {
  let service: ExternalApiService;
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        HttpModule,
      ],
      providers: [
        ExternalApiService,
        ProcessTimeService,
        {
          provide: 'TransactionId',
          useValue: '98#$vfk/Hd$36G',
        },
      ],
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
    service = moduleRef.get<ExternalApiService>(ExternalApiService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('ExternalApiService', () => {
    it('Start Service', async () => {
      expect(app).toBeDefined();
    });

    it('Return Exitoso', async () => {
      const getPlanetsResponse: GetPlanetsResponse = {
        count: 0,
        next: 'string',
        previous: 'string',
        results: [],
      };
      const respuestaSoapCompleta: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: getPlanetsResponse,
        config: undefined,
      };
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(respuestaSoapCompleta));
      expect(service.getAllPlanets()).toEqual(
        Promise.resolve(respuestaSoapCompleta.data),
      );
    });

    it('catch Gateway time out', async () => {
      const respuestaSoapCompleta: AxiosResponse = null;
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(respuestaSoapCompleta));
      expect(service.getAllPlanets()).toEqual(
        Promise.resolve({
          statusCode: 504,
          message: 'Gateway time out',
        }),
      );
    });
  });
});
