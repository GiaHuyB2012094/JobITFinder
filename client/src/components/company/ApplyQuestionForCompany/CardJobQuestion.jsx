import { useState } from "react";
import { convertData, salaryScale } from "../../../constants/convertData";
import { useGetSkillsQuery } from "../../../slices/skillOfCompanyApiSlice";
import { useGetCompanyItemQuery } from "../../../slices/usersApiSlice";
import { Modal } from "antd";
import QuestionsChooseTable from "./QuestionsChooseTable";

const CardJobQuestion = (props) => {
  const { job } = props;

  const [isOpenShowSetOfQuestions, setIsOpenShowSetOfQuestions] =
    useState(false);

  const { data: dataCompany } = useGetCompanyItemQuery(job.company);
  const { data: dataSkills } = useGetSkillsQuery();

  return (
    <div>
      <div
        onClick={() => setIsOpenShowSetOfQuestions(true)}
        className="flex-between border text-sm  w-full cursor-pointer hover:bg-orange-50"
      >
        <div className="p-2">
          <p className="font-medium w-full truncate">{job.name}</p>
          <p className="text-indigo-500 uppercase w-full truncate">
            {dataCompany?.nameCompany}
          </p>
          <p className=" text-xs capitalize w-full truncate">
            {dataCompany?.address}
          </p>
        </div>

        <div className="pr-3  space-y-1 flex flex-col items-end">
          <p className="text-indigo-500 ">
            {salaryScale(job.minSalary, job.maxSalary)}
          </p>
          <div className="flex flex-wrap gap-1 justify-end max-h-12 overflow-hidden ">
            {job.skills.map((skill, idx) => (
              <p key={idx} className="border text-xs border-slate-400  px-3 ">
                {convertData(dataSkills, skill)}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal
        title={
          <p className="text-lg pb-3 border-b text-orange-500">
            Chọn bộ câu hỏi
          </p>
        }
        centered
        open={isOpenShowSetOfQuestions}
        onCancel={() => setIsOpenShowSetOfQuestions(false)}
        width={1100}
        okType="primary"
        footer={null}
      >
        <QuestionsChooseTable job={job} />
      </Modal>
    </div>
  );
};

export default CardJobQuestion;
