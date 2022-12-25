import { Injectable } from '@nestjs/common';

//한주의 날짜 생성
const createWeekDate = (date: Date) => {
  let weekDateStr = '';
  // 토요일까지의 날짜 셋팅
  for (let i = 0; i < 7; i++) {
    if (i !== 0) date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    weekDateStr += `${year}-${month}-${day},`;
  }
  weekDateStr = weekDateStr.slice(0, -1);
  return weekDateStr;
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getWeekDate(date: string, kind: string): object {
    let responseData = {};
    //받은 값
    const setDate = !date ? new Date() : new Date(date);

    //년,월,수 가져오기
    const year = setDate.getFullYear();
    const month = setDate.getMonth();
    const day = setDate.getDate();

    //시작일 셋팅
    let weekStartDate = new Date();
    let weekDate = '';

    if (kind === 'now') {
      //현재
      const dayOfWeek = setDate.getDay();
      weekStartDate = new Date(year, month, day - dayOfWeek); //일요일
    } else if (kind === 'prev') {
      //이전
      weekStartDate = new Date(year, month, day - 7);
    } else if (kind === 'next') {
      //다음
      weekStartDate = new Date(year, month, day + 7);
    }

    weekDate = createWeekDate(weekStartDate);

    responseData = {
      ...responseData,
      weekDate,
    };

    return responseData;
  }

  getMonthDate(year: number, month: number): string[] {
    const monthArr = [];
    let weekNum = 1;
    const date = new Date(year, month - 1);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //첫일
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //막일

    do {
      //다음달로 바뀌면 break
      if (lastDay.getMonth() < firstDay.getMonth() || firstDay.getMonth() === 0)
        break;

      //첫일의 년,월,일,요일 가져오기
      const year = firstDay.getFullYear();
      const month = firstDay.getMonth();
      const day = firstDay.getDate();
      const dayOfWeek = firstDay.getDay();
      let weekDate = '';

      //주의 시작일 셋팅
      const weekStartDate = new Date(year, month, day - dayOfWeek); //일요일
      weekDate = createWeekDate(weekStartDate);

      monthArr.push({
        weekNum,
        weekDate,
      });

      //첫일+7로 재설정
      firstDay = new Date(year, month, day + 7);
      weekNum += 1;
    } while (true);

    return monthArr;
  }
}
