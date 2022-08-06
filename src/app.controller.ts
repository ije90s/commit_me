import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //1주차 조회
  @Get('/week-search')
  getWeekDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('kind') kind: string,
  ): object {
    return this.appService.getWeekDate(startDate, endDate, kind);
  }

  //월별 조회
  @Get('/month-week-search')
  getMonthDate(
    @Query('year') year: number,
    @Query('month') month: number,
  ): string[] {
    return this.appService.getMonthDate(year, month);
  }
}
