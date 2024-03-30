import { useNavigate } from "react-router-dom";
import { convertData, salaryScale } from "../../constants/convertData";
import { useGetSkillsQuery } from "../../slices/skillOfCompanyApiSlice";
import { useGetCompanyItemQuery } from "../../slices/usersApiSlice";

const CardApplySuggest = (props) => {
  const { job } = props;

  const { data: dataCompany } = useGetCompanyItemQuery(job.company);
  const { data: dataSkills } = useGetSkillsQuery();
  const navigate = useNavigate();

  const handleOnClick = () => {
    props.onClose(false);
    navigate(`/job-detail/${job._id}/${dataCompany?.nameCompany}`);
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex-between text-sm pb-2 border-b w-full cursor-pointer"
    >
      <div className="">
        <p className="font-medium w-80 truncate">{job.name}</p>
        <p className="text-indigo-500 uppercase w-80 truncate">
          {dataCompany?.nameCompany}
        </p>
        <p className=" text-xs capitalize w-80 truncate">
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
  );
};

export default CardApplySuggest;
