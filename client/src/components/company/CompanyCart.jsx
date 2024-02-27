import { quantityOfEmployee } from "../../constants/convertData"
import { FaUsers  } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import Image from "../Image"
import { Link } from "react-router-dom";
const CompanyCart = (props) => {
    const { 
        title,
        image,
        quantity,
        address,
        skills,
        idCompany } = props
  return (
    <>
        <Link to={`/company-item/${idCompany}/${title}`}>
                <div className="flex-center cursor-pointer min-w-[700px] h-[165px] gap-x-5 p-3 bg-white rounded-md shadow-md
                        hover:bg-indigo-50 hover:border-solid hover:border-2 hover:border-indigo-200"
                    >
                    <div className="w-1/5 flex-center h-[150px] p-5">
                        <Image
                            src={image}
                            alt="SignInImage"
                            className="w-full h-fit"
                        />
                    </div>
                    <div className="w-4/5 h-full">
                        <p className="text-xl font-medium text-indigo-500">{title}</p>
                        <div className="">
                            <p className="my-1 flex items-center gap-1"><IoLocationSharp/>{address}</p>
                            <p className="my-1 flex items-center gap-1"><FaUsers/>{quantityOfEmployee(quantity)}</p>
                        </div>
                        <div className="flex my-1">
                            {
                                skills?.slice(0,5)?.map((skill,idx) => (
                                    <div 
                                    className="py-1 my-2 px-4 mx-1 cursor-pointer font-medium text-xs rounded-full bg-indigo-200 shadow-sm"
                                    key={idx}
                                    >
                                    {skill}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
        </Link>
    </>
  )
}

export default CompanyCart
