
const OptionsSearchCompanies = (props) => {
    const options = [
        {
          name: "Danh sách các công ty top",
          handler: props.actionProvider.handleShowListTopCompanies,
          id: 1
        },
        {
          name: "Tìm kiếm bằng cách nhập tên",
          handler: props.actionProvider.handleSearchCompanyWithTyping,
          id: 2
        },
    ];

  return (
    <div className="flex items-center justify-center flex-col pb-3 ml-5">
        <h1 className="font-medium text-lg text-indigo-700">{props.title}</h1>

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

export default OptionsSearchCompanies
