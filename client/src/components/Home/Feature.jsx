import Image from "../Image";
import cvFlatIcon from "../../assets/Flaticons/cv.png";
import salaryFlatIcon from "../../assets/Flaticons/calendar.png";
import seekJobFlatIcon from "../../assets/Flaticons/job-search.png";
import companyFlatIcon from "../../assets/Flaticons/buildings.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Feature = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="min-h-80 w-full flex-center flex-col gap-8 bg-white drop-shadow border py-16">
      <p className="font-medium text-indigo-500 text-2xl">
        Các tính năng chính
      </p>

      <div className="flex-between gap-3 w-4/5">
        {/* create cv */}
        <Link
          className="flex-col w-44 text-gray-600 bg-indigo-50 cursor-pointer p-8 rounded-md flex-center shadow-md
            border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50"
          to="/create-resume"
        >
          <Image src={cvFlatIcon} alt="cv" className="w-20" />

          <h4 className="font-medium">Tạo CV</h4>
        </Link>

        {/* see cal salary gross-net */}
        <Link
          className="flex-col w-44 text-gray-600 bg-indigo-50 cursor-pointer p-8 rounded-md flex-center shadow-md
            border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50"
          to="/gross-net"
        >
          <Image src={salaryFlatIcon} alt="cv" className="w-[60px]" />

          <h4 className="text-center font-medium">Tính lương Gross-Net</h4>
        </Link>

        {/* see job post*/}
        <Link
          className="flex-col w-44 text-gray-600 bg-indigo-50 cursor-pointer p-8 rounded-md flex-center shadow-md
            border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50"
          to="/seeking-jobs/fresher"
        >
          <Image src={seekJobFlatIcon} alt="cv" className="w-20" />

          <h4 className="font-medium">Tuyển dụng</h4>
        </Link>

        {/* see company*/}
        <Link
          className="flex-col w-44 text-gray-600 bg-indigo-50 cursor-pointer p-8 rounded-md flex-center shadow-md
            border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50"
          to="/company-top"
        >
          <Image src={companyFlatIcon} alt="cv" className="w-20" />

          <h4 className="font-medium">Top Công ty</h4>
        </Link>

        {/* create cv */}
        <Link
          className="flex-col w-44 text-gray-600 bg-indigo-50 cursor-pointer p-8 rounded-md flex-center shadow-md
            border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50"
          to={`/save-post/${userInfo?._id}`}
        >
          <Image src={cvFlatIcon} alt="cv" className="w-20" />

          <h4 className="font-medium">Lưu bài</h4>
        </Link>
      </div>
    </div>
  );
};

export default Feature;
