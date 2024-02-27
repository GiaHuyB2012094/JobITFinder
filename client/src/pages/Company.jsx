import dayjs from "dayjs";
import {  Image, Nav, SlideBar } from "../components"
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { Calendar, Popover } from "antd";
import { useSelector } from "react-redux";
import { useGetAppliesCompanyIDQuery } from "../slices/applyApiSlice";
import flatIconPost from '../assets/Flaticons/post.png';
import usersIconPost from '../assets/Flaticons/teamwork.png';
import calendarIconPost from '../assets/Flaticons/timetable.png';
import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
// chart
// import { BarChart } from "recharts";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetPostItemWithCompanyQuery } from "../slices/postApiSlice";
import { convertDateFormat, formatDateYYYYMMDD } from "../constants/convertData";
import { Link } from "react-router-dom";
const datarr = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Company = () => {
  const { userInfo } = useSelector(state => state.auth);
  const { data: dataApply } = useGetAppliesCompanyIDQuery(userInfo?._id);
  const { data: dataPost } = useGetPostItemWithCompanyQuery(userInfo._id, { refetchOnMountOrArgChange: true });

  var now = dayjs();

  return (
    <main className="h-screen">
        <Nav/>
        <div className="pt-16 w-full h-[700px] flex ">
            <SlideBar/>
            {/* body  */}
            <div className="flex flex-col gap-3 w-4/5 px-10 pt-2 pb-8 bg-slate-100 overflow-y-scroll no-scrollbar">
              {/* top */}
              <div className="flex-between  gap-2">
                <p className="text-xl font-medium text-orange-500 py-3">
                  Thống kê
                </p>
                <div className="flex-center gap-3">
                    <p className="font-medium text-orange-500 flex-center gap-1">
                      <span><FaRegCalendarCheck/></span>
                      <span className="text-gray-500 ">{now.format("HH giờ mm")},</span>
                      {now.format("DD-MM-YYYY")}
                    </p>
                    <p>EN v</p>
                    <p><FaBell/></p>
                </div>              </div>

              {/* bottom */}
              <div className="flex w-full gap-4">
                {/* left */}
                <div className="flex flex-col gap-3 w-3/4">
                  {/* sum posts */}
                  <div className="flex-between gap-3 w-full rounded-md py-3 px-6 bg-orange-400 text-white">
                   <div className="font-medium flex flex-col gap-3">
                      <p className="text-sm">Hello KMS</p>
                      <p className="text-2xl">Bạn có <span className="text-3xl">9</span> đơn ứng tuyển mới trong ngày hôm nay !</p>
                      <p className="text-lg">Cùng xem nào</p>
                   </div>
                    <div className="">
                      <Image
                        src="https://img.freepik.com/free-vector/smart-spaces-abstract-concept-illustration-spaced-learning-school-ai-education-learning-management-system-teaching-resources-academic-progress-collaboration_335657-3470.jpg?w=740&t=st=1708092941~exp=1708093541~hmac=0262716f32224d30246aa415a94561b571d1fba29f28de40db1f1da0cd346848"
                        alt="candide"
                        className="w-36"
                      />
                    </div>
                  </div>
                  {/* chart */}
                  <div className="flex flex-col h-[300px] gap-3 w-full rounded-md py-3 px-6 bg-white shadow-md">
                    <p className="text-xl font-medium flex gap-2 items-center text-orange-500">
                      <span className="">
                        <MdDashboard/>
                      </span> 
                      Thống kê năm {now.format('YYYY')}
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={datarr}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  {/* recruitment process */}
                  <div className="">
                    <p className="text-xl font-medium text-orange-500 py-3">
                      Quá trình tuyển dụng
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex-between font-medium gap-2 px-5 ">
                          <p className="w-28">Tên</p>
                          <p className="w-28">Vị trí</p>
                          <p className="w-32">Ngày Phỏng Vấn</p>
                          <p className="w-64">Công vịệc</p>
                          <p className="w-28">Số điện thoại</p>
                        </div>
                        {/* candidate */}
                        {dataApply?.map((apply, idx) => (
                          <div key={idx} className="flex-between gap-2 px-5 py-3 rounded-lg bg-white shadow-md">
                            <div className="flex items-center gap-2 w-28">
                              <Image
                                src=""
                                alt="avatar"
                                className="w-8"
                              />
                              <p className="">{apply.name}</p>
                            </div>
                            <p className="w-28">{apply.post.level[0]}</p>
                            <p className="w-32">{convertDateFormat(apply.post.deadline)}</p>
                            <p className="w-64 truncate">{apply.post.name}</p>
                            <p className="w-28">{apply.phone}</p>
                          </div>
                        ))}
                        
                        
                        
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="flex flex-col gap-3 w-1/4">
                    {/* calendar */}
                    <div className="">
                      <Calendar 
                        fullscreen={false}
                        // dateCellRender={dateCellRender}
                        />
                    </div>
                    {/*  */}
                    <div className="w-full flex flex-col gap-2 py-3 px-5 bg-white rounded-md drop-shadow-md">
                      <div  className="flex gap-7 items-center">
                          <Image
                            src={flatIconPost}
                            alt="post"
                            className="w-10 h-10"
                          />
                          <div className="flex flex-col">
                            <p className="font-medium">Số bài đăng</p>
                            <p className="font-bold text-orange-500 text-xl">2</p>
                          </div>
                      </div>
                      <div  className="flex gap-7 items-center">
                          <Image
                            src={usersIconPost}
                            alt="post"
                            className="w-10 h-10"
                          />
                          <div className="flex flex-col">
                            <p className="font-medium">Số lượng ứng tuyển</p>
                            <p className="font-bold text-orange-500 text-xl">15</p>
                          </div>
                      </div>
                      <div  className="flex gap-7 items-center">
                          <Image
                            src={calendarIconPost}
                            alt="post"
                            className="w-10 h-10"
                          />
                          <div className="flex flex-col">
                            <p className="font-medium">Đã đặt lịch hẹn</p>
                            <p className="font-bold text-orange-500 text-xl">1</p>
                          </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="w-full flex flex-col gap-2 p-2 bg-white shadow-md rounded-md">
                      <div className="font-medium flex-between px-3 py-2 text-lg">
                        <p className="text-orange-500">Các bài đăng</p>
                        <p className="">2</p>
                      </div>

                      <div className="flex flex-col gap-1">
                        {dataPost?.map((post,idx) => (
                          <div key={idx}>
                            <Link to="/my-jobs">
                              <Popover content={post.name} title="Tên bài đăng" trigger="hover" placement="left">
                                <div className="flex flex-col gap-1 w-full border-2 border-solid border-gray-200  shadow-md p-3 cursor-pointer hover:bg-orange-100">
                                  <p className="font-medium text-indigo-500  truncate">{post.name}</p>
                                  <div className="flex-between">
                                    <div className="flex-between gap-2 ">
                                      <p><FaCalendarAlt/></p>
                                      <p>{convertDateFormat(post.deadline)}</p>
                                    </div>
                                    <div className="">
                                      <p>{post.apply} Ứng cử viên</p>
                                    </div>
                                  </div>
                                </div>
                              </Popover>
                            </Link>
                          </div>
                        ))}
                        

                        
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </main>
  )
}

export default Company
