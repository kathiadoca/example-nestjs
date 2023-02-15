import { ApiProperty } from '@nestjs/swagger';

/**
 *  @description El objeto de transferencia de datos es un objeto que define cómo se enviarán los
 *  datos a través de la red, adicional se pueden usar decoradores de class validator para la definicion
 *  de datos obligatorios o metodos de swagger.
 *
 *  @author Luis Torres
 *
 */
export class ApiResponseDto {
  @ApiProperty()
  responseCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: any;
  constructor(responseCode: number, message: string, data?: any) {
    this.responseCode = responseCode;
    this.message = message;
    this.data = data;
  }
}
