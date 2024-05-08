import { useState } from "react";
import { Nav, SlideBar } from "../components";
import QuestionAdd from "../components/company/InterviewQuestion/QuestionAdd";
import Questions from "../components/company/InterviewQuestion/Questions";

const InterviewQuestion = () => {
  return (
    <main className="max-h-screen">
      <Nav />
      <div className="pt-16 w-full max-h-screen flex">
        <SlideBar />
        <div className="space-y-3 max-h-screen  w-4/5 p-10 pb-8 bg-slate-100 overflow-y-scroll no-scrollbar">
          <div className="w-full min-h-full bg-white py-3 px-6 rounded-md shadow-lg  ">
            <p className="pb-2 border-b">Tạo câu hỏi phỏng vấn</p>
            <div className="w-full py-2 flex gap-x-5">
              <QuestionAdd />
              <Questions />
            </div>
            {/* body */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default InterviewQuestion;
