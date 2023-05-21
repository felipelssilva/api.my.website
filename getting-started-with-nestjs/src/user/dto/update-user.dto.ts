import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;
}
