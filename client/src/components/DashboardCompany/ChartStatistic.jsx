import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { MdDashboard } from "react-icons/md";
import dayjs from "dayjs";
const datarr = [
  {
    name: "Tháng 1",
    candidate: 4000,
    post: 2400,
    amt: 2400,
  },
  {
    name: "Tháng 2",
    candidate: 3000,
    post: 1398,
    amt: 2210,
  },
  {
    name: "Tháng 3",
    candidate: 2000,
    post: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 4",
    candidate: 2780,
    post: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 5",
    candidate: 1890,
    post: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 6",
    candidate: 2390,
    post: 3800,
    amt: 2500,
  },
  {
    name: "Tháng 7",
    candidate: 3490,
    post: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 8",
    candidate: 3490,
    post: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 9",
    candidate: 3490,
    post: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 10",
    candidate: 3490,
    post: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 11",
    candidate: 3490,
    post: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 12",
    candidate: 3490,
    post: 4300,
    amt: 2100,
  },
];
const ChartStatistic = () => {
  var now = dayjs();

  return (
    <div className="flex flex-col h-[300px] gap-3 w-full rounded-md py-3 px-6 bg-white shadow-md">
      <p className="text-xl font-medium flex gap-2 items-center text-orange-500">
        <span className="">
          <MdDashboard />
        </span>
        Thống kê năm {now.format("YYYY")}
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
          <Bar
            dataKey="post"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="candidate"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartStatistic;
