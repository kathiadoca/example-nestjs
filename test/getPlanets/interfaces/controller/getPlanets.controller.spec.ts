import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { ApiResponseDto } from '../../../../src/share/domain/dto/apiResponse.dto';
import { ProcessTimeService } from '../../../../src/share/domain/config/processTime.service';
import { TransaccionIdProvider } from '../../../../src/share/domain/config/transactionId.provider';
import { GetPlanetsService } from '../../../../src/getPlanets/application/getPlanets.service';
import { GetPlanetsController } from '../../../../src/getPlanets/interfaces/controller/getPlanets.controller';

jest.mock('../../../../src/getPlanets/application/getPlanets.service');
describe('Controller', () => {
  let service: GetPlanetsService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GetPlanetsController],
      providers: [GetPlanetsService, TransaccionIdProvider, ProcessTimeService],
    }).compile();

    service = moduleRef.get<GetPlanetsService>(GetPlanetsService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Controller', () => {
    it('Initialize - Success', async () => {
      expect(app).toBeDefined();
    });

    it('Must response OK', async () => {
      jest
        .spyOn(service, 'getPlanets')
        .mockResolvedValue(new ApiResponseDto(200, 'OK', {}));

      return request(app.getHttpServer())
        .get('/PLANETS')
        .expect(200)
        .expect((response) => {
          expect(response.body.responseCode).toEqual(200);
          expect(response.body.message).toEqual('OK');
          expect(service.getPlanets).toBeDefined();
        });
    });
  });
});
