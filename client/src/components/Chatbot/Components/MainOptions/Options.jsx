import { useEffect } from "react";
import { useGetCompanyListQuery } from "../../../../slices/usersApiSlice";

const Options = ({actionProvider, title, setState}) => {
  const { data: dataCompanyList, isLoading: isLoadingDataCompanies } = useGetCompanyListQuery();
  
  useEffect(() => {
    setState((state) => ({
      ...state,
      companies: dataCompanyList,
    }))
  },[dataCompanyList])
  
  const options = [
      {
        name: "Tìm công ty",
        handler: actionProvider.handleCompanyFilter,
        id: 1
      },
      {
        name: "Ứng tuyển vào vị trí tuyển dụng",
        handler: actionProvider.handleApply,
        id: 2
      },
      {
        name: "Tạo đơn xin ứng tuyển",
        handler: actionProvider.handleCompanyCVSubmit,
        id: 3
      },
  ];
    
  return (
    <div className="flex items-center justify-center flex-col pb-3 ml-5">
        <h1 className="font-medium text-lg text-indigo-700">{title}</h1>

        <div className="flex  justify-center flex-col gap-2 my-1 px-2">
            {options.map((option) => (
              <div
                  className="text-sm text-white rounded-md bg-emerald-400 py-2 px-3 shadow-sm 
                      hover:bg-emerald-300 hover:text-black cursor-pointer"
                  onClick={option.handler}
                  key={option.id}
              >
                  {option.name}
              </div>
                )
            )}
        </div>
    </div>
  )
}

export default Options
