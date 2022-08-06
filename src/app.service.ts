import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getWeekDate(startDate: string, endDate: string, kind: string) {
    let weekDate = {};
    //받은 값
    const setStart = !startDate ? new Date() : new Date(startDate);
    const setEnd = !endDate ? new Date() : new Date(endDate);

    //년,월,수 가져오기
    const startYear = setStart.getFullYear();
    const startMonth = setStart.getMonth();
    const startDay = setStart.getDate();
    const endYear = setEnd.getFullYear();
    const endMonth = setEnd.getMonth();
    const endDay = setEnd.getDate();

    //시작일,끝일
    let weekStartDate = new Date();
    let weekEndDate = new Date();

    if (kind === 'now') {
      //현재
      const dayOfWeek = setStart.getDay();
      weekStartDate = new Date(startYear, startMonth, startDay - dayOfWeek); //일요일
      weekEndDate = new Date(startYear, startMonth, startDay + (6 - dayOfWeek)); //토요일
    } else if (kind === 'prev') {
      //이전
      weekStartDate = new Date(startYear, startMonth, startDay - 7);
      weekEndDate = new Date(endYear, endMonth, endDay - 7);
    } else if (kind === 'next') {
      //다음
      weekStartDate = new Date(startYear, startMonth, startDay + 7);
      weekEndDate = new Date(endYear, endMonth, endDay + 7);
    }

    //시작일 셋팅
    let year = weekStartDate.getFullYear();
    let month = String(weekStartDate.getMonth() + 1).padStart(2, '0');
    let day = String(weekStartDate.getDate()).padStart(2, '0');
    const firstStr = `${year}-${month}-${day}`;

    //끝일 셋팅
    year = weekEndDate.getFullYear();
    month = String(weekEndDate.getMonth() + 1).padStart(2, '0');
    day = String(weekEndDate.getDate()).padStart(2, '0');
    const endStr = `${year}-${month}-${day}`;
    weekDate = {
      startDate: firstStr,
      endDate: endStr,
    };

    return weekDate;
  }

  getMonthDate(year: number, month: number) {
    const monthArr = [];
    let weekNum = 1;
    const date = new Date(year, month - 1);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //첫일
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //막일

    do {
      //첫일의 달이 더 크다면, break
      if (lastDay.getMonth() < firstDay.getMonth()) break;

      //첫일의 년,월,일,요일 가져오기
      const year = firstDay.getFullYear();
      const month = firstDay.getMonth();
      const day = firstDay.getDate();
      const dayOfWeek = firstDay.getDay();

      //주의 시작일 셋팅
      const weekStartDate = new Date(year, month, day - dayOfWeek); //일요일
      let weekYear = weekStartDate.getFullYear();
      let weekMonth = String(weekStartDate.getMonth() + 1).padStart(2, '0');
      let weekDay = String(weekStartDate.getDate()).padStart(2, '0');
      const firstStr = `${weekYear}-${weekMonth}-${weekDay}`;

      //주의 끝일 셋팅
      const weekEndDate = new Date(year, month, day + (6 - dayOfWeek)); //토요일
      weekYear = weekEndDate.getFullYear();
      weekMonth = String(weekEndDate.getMonth() + 1).padStart(2, '0');
      weekDay = String(weekEndDate.getDate()).padStart(2, '0');
      const endtStr = `${weekYear}-${weekMonth}-${weekDay}`;

      monthArr.push({
        weekNum,
        weekStartDate: firstStr,
        weekEndDate: endtStr,
      });

      //첫일+7로 재설정
      firstDay = new Date(year, month, day + 7);
      weekNum += 1;
    } while (true);

    return monthArr;
  }
}
