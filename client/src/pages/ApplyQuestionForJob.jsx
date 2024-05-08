import { Nav, SlideBar } from "../components";
import CompanyQuestionTable from "../components/company/ApplyQuestionForCompany/CompanyQuestionTable";

const ApplyQuestionForJob = () => {
  return (
    <main className="max-h-screen">
      <Nav />
      <div className="pt-16 w-full max-h-screen flex">
        <SlideBar />
        <div className="space-y-3 max-h-screen  w-4/5 p-10 pb-8 bg-slate-100 overflow-y-scroll no-scrollbar">
          <div className="w-full min-h-full bg-white py-3 px-6 rounded-md shadow-lg  ">
            <p>Tạo câu hỏi phỏng vấn</p>
            <p className="text-sm text-orange-500">
              (Chọn công việc thêm câu hỏi)
            </p>

            {/* body */}
            <CompanyQuestionTable />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApplyQuestionForJob;
