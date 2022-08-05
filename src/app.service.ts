import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getWeekDate(startDate: string, endDate: string, kind: string) {
    let weekDate = {};
    //받은 값
    const setStart = new Date(startDate);
    const setEnd = new Date(endDate);
    //시작일,끝일
    let weekStartDate = new Date();
    let weekEndDate = new Date();
    let year = 0,
      month = '',
      day = '',
      firstStr = '',
      endStr = '';

    if (kind === 'now') {
      //현재
      const nowYear = weekStartDate.getFullYear();
      const nowMonth = weekStartDate.getMonth() + 1;
      const nowDay = weekStartDate.getDate();
      const nowDayOfWeek = weekStartDate.getDay();
      weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); //일요일
      weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); //토요일
    } else if (kind === 'prev') {
      //이전
      weekStartDate.setDate(setStart.getDate() - 7);
      weekEndDate.setDate(setEnd.getDate() - 7);
    } else if (kind === 'next') {
      //다음
      weekStartDate.setDate(setStart.getDate() + 7);
      weekEndDate.setDate(setEnd.getDate() + 7);
    }
    //시작일 셋팅
    year = weekStartDate.getFullYear();
    month = String(weekStartDate.getMonth() + 1).padStart(2, '0');
    day = String(weekStartDate.getDate()).padStart(2, '0');
    firstStr = `${year}-${month}-${day}`;
    //끝일 셋팅
    year = weekEndDate.getFullYear();
    month = String(weekEndDate.getMonth() + 1).padStart(2, '0');
    day = String(weekEndDate.getDate()).padStart(2, '0');
    endStr = `${year}-${month}-${day}`;
    weekDate = {
      startDate: firstStr,
      endDate: endStr,
    };

    return weekDate;
  }
}
