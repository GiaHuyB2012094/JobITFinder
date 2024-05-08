import { useState } from "react";
import { useGetCompanyListQuery } from "../../../slices/usersApiSlice";
import CardBot from "./CardBot";
import { IoIosArrowForward } from "react-icons/io";

const ListTopCompanies = (props) => {
  const { data: dataCompanyList } = useGetCompanyListQuery();
  const [companyLength, setCompanyLength] = useState(5);

  const handleSeeMore = () => {
    setCompanyLength((prev) => prev + 5);
    conso;
  };
  return (
    <div className="space-y-3 ml-5">
      {/* <p className="font-medium text-gray-700">{props.title}</p> */}
      <div className="space-y-2 my-1 px-2">
        {dataCompanyList && (
          <div className="w-[90%]">
            <div className="space-y-2 ">
              {dataCompanyList.slice(0, companyLength).map((company, idx) => (
                <CardBot
                  key={idx}
                  id={company._id}
                  imgI={company.avatar}
                  name={company.nameCompany}
                  address={company.address}
                />
              ))}
            </div>

            <p
              className="text-sky-700 hover:text-sky-500 cursor-pointer flex items-center justify-end  gap-x-1 my-1 "
              onClick={handleSeeMore}
            >
              Xem thêm
              <IoIosArrowForward />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTopCompanies;
