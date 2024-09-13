import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'example@dominio.com.br' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Joe doe' })
  name: string;
}
