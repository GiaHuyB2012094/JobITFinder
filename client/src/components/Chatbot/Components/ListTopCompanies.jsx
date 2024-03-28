import { useNavigate } from "react-router-dom";
import { useGetCompanyListQuery } from "../../../slices/usersApiSlice";
import CardBot from "./CardBot";

const ListTopCompanies = (props) => {
    const { data: dataCompanyList, isLoading: isLoadingDataCompanies } = useGetCompanyListQuery();
    const navigation = useNavigate()

    

    return (
    <div className="space-y-3 ml-5">
      {/* <p className="font-medium text-gray-700">{props.title}</p> */}
      <div className="space-y-2 my-1 px-2">
        {dataCompanyList &&
            dataCompanyList.map((company, idx) => (
            //     <div
            //         className="text-sm text-white rounded-md bg-emerald-400 py-2 px-3 shadow-sm 
            //           hover:bg-emerald-300 hover:text-black cursor-pointer"
            //         onClick={() => handleOnClick(company._id, company.nameCompany)}
            //   >
            //       {company.nameCompany}
            //   </div>
              <CardBot
                key={idx}
                id={company._id}
                imgI={company.avatar}
                name={company.nameCompany}
                address={company.address}
              />
            ))
        }
      </div>
    </div>
  )
}

export default ListTopCompanies
