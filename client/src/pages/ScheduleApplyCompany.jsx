import {  Nav, SlideBar } from "../components"
import { CalendarInterview } from "../components/company"
const ScheduleCompany = () => {
  return (
    <main className="h-screen">
        <Nav/>
        <div className=" pt-16 w-full h-[700px] flex">
            <SlideBar/>
            {/* body */}
            <div className=" bg-slate-100 p-10 w-4/5 overflow-y-scroll no-scrollbar">
                <div className="w-full min-h-full bg-white py-3 px-6 rounded-md shadow-lg  ">
                  <p className="text-xl font-medium text-orange-500 py-3">Lịch Hẹn</p>
                  <CalendarInterview/>
                </div>
            </div>
        </div>
    </main>
  )
}

export default ScheduleCompany
