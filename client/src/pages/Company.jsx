import dayjs from "dayjs";
import { Image, Nav, SlideBar } from "../components";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { Calendar, Popover } from "antd";
import { useSelector } from "react-redux";

// chart
// import { BarChart } from "recharts";

import { useGetPostItemWithCompanyQuery } from "../slices/postApiSlice";
// import {
//   convertDateFormat,
//   formatDateYYYYMMDD,
// } from "../constants/convertData";
// import { Link } from "react-router-dom";
import {
  ChartStatistic,
  InterviewProcess,
  NotificationDashboard,
  PostCompany,
  QuantityTable,
} from "../components/DashboardCompany";

const Company = () => {
  var now = dayjs();

  return (
    <main className="max-h-screen">
      <Nav />
      <div className="pt-16 w-full max-h-screen flex ">
        <SlideBar />
        {/* body  */}
        <div className="space-y-3 w-4/5 px-10 pt-2 pb-8 bg-slate-100 overflow-y-scroll no-scrollbar">
          {/* top */}
          <div className="flex-between  gap-2">
            <p className="text-xl font-medium text-orange-500 py-3">Thống kê</p>
            <div className="flex-center gap-3">
              <p className="font-medium text-orange-500 flex-center gap-1">
                <span>
                  <FaRegCalendarCheck />
                </span>
                <span className="text-gray-500 ">
                  {now.format("HH giờ mm")},
                </span>
                {now.format("DD-MM-YYYY")}
              </p>
              <p>EN v</p>
              <p>
                <FaBell />
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="space-y-3 w-3/4">
              <NotificationDashboard />
              <ChartStatistic />
              <InterviewProcess />
              <PostCompany />
            </div>
            <div className="space-y-3 w-1/4">
              <Calendar fullscreen={false} />
              <QuantityTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Company;
