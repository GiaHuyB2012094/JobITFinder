import { useSelector } from "react-redux";
import { Nav, SlideBar } from "../components";
import { CalendarInterview } from "../components/company";
import { useGetAppliesCompanyIDQuery } from "../slices/applyApiSlice";
import { useMemo } from "react";
import { convertDateFormat } from "../constants/convertData";
const ScheduleCompany = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: dataApply } = useGetAppliesCompanyIDQuery(userInfo?._id);

  const eventss = useMemo(() => {
    let result = [];
    dataApply?.forEach((item) => {
      if (item?.interviewSchedule) {
        let obj = {
          title: item.name,
          scheduled: convertDateFormat(item.interviewSchedule.interviewTime),
          desc: item.post.name,
        };
        result.push(obj);
      }
    });
    return result;
  }, [dataApply]);
  console.log(eventss);
  return (
    <main className="h-screen">
      <Nav />
      <div className=" pt-16 w-full h-[700px] flex">
        <SlideBar />
        {/* body */}
        <div className="w-3/5 bg-slate-100 p-10 ">
          <div className="min-h-full bg-white py-3 px-6 rounded-md shadow-lg  ">
            <p className="text-xl font-medium text-orange-500 py-3">
              Lịch hẹn trong tháng
            </p>
            <CalendarInterview />
          </div>
        </div>

        <div className="w-2/5 py-5 px-6">
          <p className="text-xl font-semibold pb-1 border-b-2 border-orange-300 w-24">
            Lịch trình
          </p>
          {/* <div className="border-b w-full my-2"></div> */}
          <div className="pt-5">
            <div className="font-medium border-b py-3 text-sm flex bg-sky-50 px-2">
              <p className="w-8 ">STT</p>
              <p className="w-24 line-clamp-1">Tên</p>
              <p className="w-24">Ngày</p>
              <p className="w-60 ">Vị trí ứng tuyển</p>
            </div>
            <div className="max-h-[500px] scroll-y-auto overflow-y-scroll no-scrollbar">
              {eventss?.map((candidate, idx) => (
                <div
                  key={idx}
                  className=" border-b py-3 text-sm flex bg-slate-50 px-2"
                >
                  <p className="w-8 font-medium">{idx + 1}.</p>
                  <p className="w-24 line-clamp-1">{candidate.title}</p>
                  <p className="w-24">{candidate.scheduled}</p>
                  <p className="w-60 ">{candidate.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ScheduleCompany;
