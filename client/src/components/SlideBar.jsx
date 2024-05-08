import { useDispatch, useSelector } from "react-redux";
import Image from "./Image";
import Button from "./Button";
import { memo } from "react";

import { itemSlideBar, urlAvatarDefault } from "../constants";

import { ImProfile } from "react-icons/im";
import { MdUpload } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { IoDocumentText } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
const SlideBar = memo(() => {
  const arrIcons = [
    <ImProfile key={1} />,
    <GrSchedule key={2} />,
    <MdUpload key={3} />,
    <FaListAlt key={4} />,
    <FaUsers key={5} />,
    <IoDocumentText key={6} />,
    <HiOutlineClipboardDocumentList key={7} />,
    <IoLogOutSharp key={8} />,
  ];
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const onClick = async (key) => {
    if (key === "logout") {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <main className="h-full my-0 py-3  px-3 bg-white w-1/5  border-r border-solid border-gray-100">
      <div className="w-full flex items-center justify-between gap-3 border-b-2 border-solid border-gray-200 pb-4">
        <div className="">
          <Image
            src={userInfo?.avatar || urlAvatarDefault}
            alt="avatar"
            className="w-24 "
          />
        </div>
        <div className="space-y-3 space-x-3">
          <p className="text-xl font-medium  text-orange-500 ">"Công ty"</p>
          <p className="text-base font-normal line-clamp-2 ">
            {userInfo?.nameCompany}
          </p>
          <Button
            title="Thông tin cá nhân"
            styles="w-36 text-sm !bg-orange-400"
            to="/profile"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 my-5">
        {itemSlideBar?.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="flex items-center py-0 gap-4"
            onClick={() => onClick(item.key)}
          >
            <div
              className={`flex items-center text-gray-500 justify-start px-5 font-medium py-3 gap-4 w-full rounded-md
                    ${
                      item.path === location.pathname
                        ? "bg-orange-200 text-gray-600 "
                        : ""
                    }`}
            >
              {arrIcons[idx]}
              <p>{item.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
});

SlideBar.displayName = "SlideBar";

export default SlideBar;
