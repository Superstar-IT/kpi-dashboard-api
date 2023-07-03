import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { getValidateOptions } from 'src/utils/validation';

export class CreateKpiDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name',
  })
  @IsNotEmpty(getValidateOptions(`name required`))
  @IsString(getValidateOptions('Invalid name'))
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Value',
  })
  @IsNotEmpty(getValidateOptions(`Value required`))
  @IsString(getValidateOptions('Invalid Value'))
  value: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Description',
  })
  @IsNotEmpty(getValidateOptions(`Description required`))
  @IsString(getValidateOptions('Invalid Description'))
  description: string;
}
