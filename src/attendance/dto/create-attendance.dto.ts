import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  attendance_date: Date;
}

export class SearchAttendanceDto extends PartialType(CreateAttendanceDto) {
  image_url: string;
  count: number;
}
