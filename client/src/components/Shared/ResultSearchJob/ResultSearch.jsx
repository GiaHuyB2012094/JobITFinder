import { Link } from "react-router-dom";
import { useGetCompanyItemQuery } from "../../../slices/usersApiSlice";
import { useId } from "react";
import Image from "../../Image";

const ResultSearch = ({ result }) => {
  const { data: dataCompanyItem } = useGetCompanyItemQuery(result.company);

  const id = useId();

  return (
    <Link
      className=" p-3 hover:bg-indigo-100 border-b cursor-pointer flex items-center gap-x-5"
      to={`/job-detail/${result.id}/${dataCompanyItem?.nameCompany}`}
    >
      <div className="w-10 h-10 bg-white flex-center">
        <Image
          src={dataCompanyItem?.avatar}
          alt={`result.name-${id}`}
          className="h-fit"
        />
      </div>
      <p className="line-clamp-2">{result.name}</p>
    </Link>
  );
};

export default ResultSearch;
