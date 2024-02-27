import { useSelector } from "react-redux"
import Image from "./Image"
import Button from "./Button";
import { memo, useState } from "react";

import { itemSlideBar } from "../constants";

import { ImProfile } from "react-icons/im";
import { MdUpload } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SlideBar = memo(() => {
    const arrIcons = [<ImProfile/>,<GrSchedule/>,<MdUpload/>,<FaListAlt/>,<FaUsers />,<IoLogOutSharp/>]
    const { userInfo } = useSelector(state => state.auth);
    const location = useLocation()
  return (
    <main className="h-full my-0 py-3 px-3 bg-white w-1/5 shadow-lg border-2 border-solid border-gray-100">
      <div className="w-full flex-between  border-b-2 border-solid border-gray-200 pb-4"> 
        <div className="">
            <Image
                src={userInfo?.avatar}
                alt="okookok"
                className="w-24 "
            />
        </div>
        <div className="flex-center flex-col gap-2">
            <p className="text-xl font-medium  text-orange-500 ">"Công ty"</p>
            <p className="text-base font-normal">{userInfo?.nameCompany}</p>    
            <Button
                title="Thông tin cá nhân"
                styles="w-36 text-sm !bg-orange-400"
                to="/profile"

            />
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 my-5">
            {itemSlideBar?.map((item,idx) => (
               <Link key={idx} to={item.path} className="flex items-center py-0 gap-4">
                <div 
                  className={`flex items-center text-gray-500 justify-start px-5 font-medium py-3 gap-4 w-full rounded-md
                    ${item.path === location.pathname ? "bg-orange-200 text-gray-600 " : ""}`}
                  >
                  
                    {arrIcons[idx]}
                    <p>{item.label}</p>
                </div>
              </Link>

           ))}
      </div>

    </main>
  )
})

SlideBar.displayName = "SlideBar"

export default SlideBar
