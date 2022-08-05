import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './schema/attendnace.schema';
import {
  CreateAttendanceDto,
  SearchAttendanceDto,
} from './dto/create-attendance.dto';
import { Model } from 'mongoose';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendancetModel: Model<Attendance>,
    private accountService: AccountService,
  ) {}

  //생성
  async create(attendanceArr: Array<object>) {
    //출석 추가
    try {
      const result = await this.attendancetModel.insertMany(attendanceArr, {
        ordered: false,
      });
      console.log(`${result.length}개 누적 성공`);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //날짜 조회
  async findAll(
    startDate: string,
    endDate: string,
  ): Promise<Array<SearchAttendanceDto>> {
    const attendanceArr = [];
    const accountArr = [];
    //해당되는 날짜 조회 후, 오름차순으로 정렬(날짜)
    const attendance = await this.attendancetModel
      .find({
        attendance_date: { $gte: startDate, $lt: endDate },
      })
      .sort({ attendance_date: 1 });

    // 필요 데이터로 가공
    // eslint-disable-next-line prettier/prettier
    for(const item of attendance){
      const { user_id, attendance_date } = item;
      //날짜 포맷
      const year = attendance_date.getFullYear();
      const month = String(attendance_date.getMonth() + 1).padStart(2, '0');
      const day = String(attendance_date.getDate()).padStart(2, '0');
      const attendance = `${year}-${month}-${day}`;
      if (!accountArr.includes(user_id)) {
        //없는 경우
        const account = await this.accountService.getOne(user_id);
        if (!account) {
          throw new NotFoundException(`${user_id} ID not found.`);
        }
        accountArr.push(user_id);
        attendanceArr.push({
          user_id,
          image_url: account.image_url,
          attendance_date: attendance,
          count: 1,
        });
      } else {
        //있는 경우(날짜와 카운트만 추가)
        for (let i = 0; i < attendanceArr.length; i++) {
          if (attendanceArr[i].user_id === user_id) {
            attendanceArr[i].attendance_date += `,${attendance}`;
            attendanceArr[i].count += 1;
          }
        }
      }
    }

    return attendanceArr;
  }

  //출석일 최대값 조회
  async findMaxOne(user_id: string): Promise<CreateAttendanceDto> {
    return await this.attendancetModel
      .findOne({ user_id })
      .sort({ attendance_date: -1 })
      .limit(1);
  }
}
