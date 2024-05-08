import { useSelector } from "react-redux";
import { useGetPostItemWithCompanyQuery } from "../../../slices/postApiSlice";
import CardJobQuestion from "./CardJobQuestion";

const CompanyQuestionTable = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: dataJobs } = useGetPostItemWithCompanyQuery(userInfo._id, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="space-y-3 w-full min-h-96 my-3">
      {dataJobs?.map((job, idx) => (
        <CardJobQuestion key={idx} job={job} />
      ))}
    </div>
  );
};

export default CompanyQuestionTable;
