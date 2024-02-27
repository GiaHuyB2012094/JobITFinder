// import BigCalendar from "react-big-calendar";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'; // Import Vietnamese locale
import 'dayjs-ext'; 
import { useSelector } from 'react-redux';
import { useGetAppliesCompanyIDQuery, useGetAppliesUserIDQuery } from '../../slices/applyApiSlice';
import { useMemo } from 'react';
dayjs.locale('vi')

const localizer = dayjsLocalizer(dayjs)

const CalendarInterview = () => {
  const { userInfo } = useSelector(state => state.auth);
  const { data: dataApply } = useGetAppliesCompanyIDQuery(userInfo?._id);

  const eventss = useMemo(() => {
    let result = [];
    dataApply?.forEach((item) => {
      if (item?.interviewSchedule) {
        let obj = {
          'title': item.name,
          'start': new Date(item.interviewSchedule.interviewTime),
          'end': new Date(item.interviewSchedule.interviewTime),
          "desc": item.post.name,
        }
        result.push(obj);
      }
    })
    return result;
  },[dataApply])
  return (
    <div className="w-full h-[700px]">
      <Calendar
        culture="vi"
        localizer={localizer}
        events={eventss}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 700 }}
      />
    </div>
  )
}

export default CalendarInterview
