import axios from 'axios';

//** 로컬 */
export const commitLocal = axios.create({
  baseURL: 'http://localhost:8000',
});

//** 서버 */
export const commitReal = axios.create({
  baseURL: '',
});

export const Account = 'account';
export const Attendance = 'attendance';
export const History = 'history';

interface IUserInfo {
  user_id: string;
  attendance_date: string;
}
interface IAttendanceDate {
  startDate: string;
  endDate: string;
}
interface IProps {
  page?: number;
  userInfo?: IUserInfo;
  attendanceDate?: IAttendanceDate;
}

export const accountApi = {};
export const attendanceApi = {
  register: (userInfo: IUserInfo) =>
    commitLocal
      .post(`${Attendance}/register`, {
        user_id: userInfo.user_id,
        attendance_date: userInfo.attendance_date,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  read: (attendanceDate: IAttendanceDate) =>
    commitLocal
      .get(
        `${Attendance}/search?startDate=${attendanceDate.startDate}&endDate=${attendanceDate.endDate}`,
      )
      .then(res => console.log(res))
      .catch(err => console.log(err)),
};

export const historyApi = {
  read: () =>
    commitLocal
      .get(`${History}?kind=commits`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  detail: () =>
    commitLocal
      .get(`${History}/detail?kind=pulls`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  accure: (page: IProps) =>
    commitLocal
      .post(`${History}/register?kind=pull_comments&page=${page}`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  delete: () =>
    commitLocal
      .delete(`${History}/remove?kind=comments`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
};
