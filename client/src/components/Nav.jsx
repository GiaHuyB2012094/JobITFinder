import Image from "./Image";
import logoNav from "../assets/JobITFinderLogo.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Popover, Space } from "antd";
import { Menu } from "antd";

import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  contracts,
  levelList,
  locations,
  suggestTags,
  typeJobs,
} from "../constants";
import { useMemo, useState } from "react";
import { urlAvatarDefault } from "../constants";

function getItem(label, key, icon, children, type) {
  return { key, label, icon, children, type };
}

const Nav = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // sdasd
  let badgeCount = 1;
  // ádasd
  const onClick = async ({ key }) => {
    if (key === "logout") {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else if (key === "profile") {
      navigate("/profile");
    }
  };
  const items = [
    {
      label: "Thông tin cá nhân",
      key: "profile",
    },
    {
      label: "Đăng xuất",
      key: "logout",
    },
  ];

  const getItemLevel = useMemo(() => {
    const result = [];
    levelList.map((level) => {
      result.push(getItem(level.label, level.value, null, null, null));
    });
    return result;
  }, [levelList]);

  const getItemAddress = useMemo(() => {
    const result = [];
    locations.map((location) => {
      result.push(getItem(location.label, location.value, null, null, null));
    });
    return result;
  }, [locations]);

  const getItemContracts = useMemo(() => {
    const result = [];
    contracts.map((contract) => {
      result.push(getItem(contract.label, contract.value, null, null, null));
    });
    return result;
  }, [contracts]);

  const getItemTypeJobs = useMemo(() => {
    const result = [];
    typeJobs.map((typeJob) => {
      result.push(getItem(typeJob.label, typeJob.value, null, null, null));
    });
    return result;
  }, [typeJobs]);

  const getSuggestTags = useMemo(() => {
    const result = [];
    suggestTags.map((suggest) => {
      result.push(getItem(suggest.label, suggest.value, null, null, null));
    });
    return result;
  }, [suggestTags]);

  const itemsMenu = [
    getItem("Việc làm IT", "sub2", null, [
      getItem("Theo cấp bậc", "level", null, getItemLevel),
      getItem("Theo địa điểm", "address", null, getItemAddress),
      getItem("Theo kỹ năng", "skill", null, getSuggestTags),
      getItem("Theo hợp đồng", "contraction", null, getItemContracts),
      getItem("Theo loại hình", "typeJob", null, getItemTypeJobs),
    ]),
  ];

  const itemsToolMenu = [
    getItem("Công cụ", "tool", null, [
      getItem("Tạo CV", "create-resume", null),
      getItem("Tính lương Gross-Net", "gross-net", null),
    ]),
  ];

  const itemsCompaniesMenu = [
    getItem("Công ty IT", "companies", null, [
      getItem("Danh sách công ty", "list-companies", null),
      getItem("Top công ty", "top-companies", null),
    ]),
  ];

  const applyPopover = <p>Đăng nhập để ứng tuyển và xem các đơn ứng tuyển</p>;

  const handleSearchMenuClick = (val) => {
    // props.searchResult(val.key);
    navigate(`/seeking-jobs/${val.key}`);
  };

  const handleCompaniesMenuClick = (val) => {
    console.log(val);
    switch (val.key) {
      case "list-companies":
        navigate("/company-it");
        break;
      case "top-companies":
        navigate("/company-top");
        break;
      default:
        break;
    }
  };

  const handleToolMenuClick = (val) => {
    console.log(val);
    switch (val.key) {
      case "create-resume":
        navigate("/create-resume");
        break;
      case "gross-net":
        navigate("/gross-net");
        break;
      default:
        break;
    }
  };

  return (
    <main className="fixed bg-white w-full z-50">
      <nav className="flex-between h-16 mx-auto py-5 px-14 shadow-sm shadow-indigo-200">
        <div className="">
          <Link to="/" className="">
            <Image src={logoNav} className={"w-40 m-0 p-0"} />
          </Link>
        </div>

        {userInfo?.position === "user" ? (
          <ul className="lg:flex gap-5 text-base hidden flex-center">
            <li
              className="text-lg font-bold text-indigo-500 pb-1 rounded-md
                        "
            >
              <Menu
                onClick={handleSearchMenuClick}
                style={{ fontSize: "20px", color: "#6366F1", border: "none" }}
                items={itemsMenu}
                forceSubMenuRender
              />
            </li>

            <li className="text-lg font-bold text-indigo-500 pb-1 rounded-md">
              <Menu
                onClick={handleCompaniesMenuClick}
                style={{ fontSize: "20px", color: "#6366F1", border: "none" }}
                items={itemsCompaniesMenu}
              />
            </li>

            <li className="text-lg font-bold text-indigo-500 pb-1 rounded-md">
              <Menu
                onClick={handleToolMenuClick}
                style={{ fontSize: "20px", color: "#6366F1", border: "none" }}
                items={itemsToolMenu}
              />
            </li>

            <li className="hover:bg-gray-100 rounded-md">
              <Link to={`/applied-list-user/${userInfo._id}`}>
                {!userInfo ? (
                  <Popover content={applyPopover} title="Title">
                    <p className="text-lg text-indigo-500 font-bold pb-1 rounded-md px-4 py-1">
                      Ứng tuyển
                    </p>
                  </Popover>
                ) : badgeCount > 0 ? (
                  <Badge
                    size="default"
                    count={badgeCount}
                    className="text-lg text-indigo-500 font-bold pb-1 rounded-md px-4 py-1"
                  >
                    Ứng tuyển
                  </Badge>
                ) : (
                  <p className="text-lg text-indigo-500 font-bold pb-1 rounded-md px-4 py-1">
                    Ứng tuyển
                  </p>
                )}
              </Link>
            </li>

            <li
              className="text-lg text-indigo-500 font-bold pb-1 rounded-md px-4 py-1
                        hover:bg-gray-100"
            >
              <Link to={`/save-post/${userInfo._id}`}>Lưu bài</Link>
            </li>
          </ul>
        ) : (
          ""
        )}

        <div className="flex">
          {userInfo?.position !== "company" ? (
            <span className="text-base font-normal flex-center gap-1 mx-1 text-primary-black">
              <FaPhoneAlt />
              <p>0336070648</p>
            </span>
          ) : null}
          <div className="flex">
            {!userInfo ? (
              <>
                <Button
                  title="Nhà tuyển dụng"
                  roundPrimary
                  to="/sign-up-company"
                />
                <Button title="Đăng nhập" to="/signIn-signUp-User" />
              </>
            ) : null}
          </div>
          {userInfo?.position !== "company" ? (
            <div className="flex-center gap-2">
              <p className=" text-base font-medium">EN</p>
              <p className=" font-medium tex  t-primary-black">|</p>
              <p>VI</p>
            </div>
          ) : null}
          {userInfo ? (
            <div className="flex-center ml-6">
              <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="flex-center bg- rounded-md px-3 py-2 gap-x-2 cursor-pointer">
                      <div className="bg-white relative drop-shadow-md rounded-full  flex-center w-10 h-10 p-[2px]">
                        <img
                          src={userInfo?.avatar || urlAvatarDefault}
                          className="rounded-full h-8 object-contain object-center"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-600 drop-shadow-lg shadow-white"></div>
                      </div>

                      <p
                        className={`font-medium flex-center max-w-40 line-clamp-1
                                        ${
                                          userInfo?.position === "company"
                                            ? "text-orange-500"
                                            : "text-indigo-500"
                                        }`}
                      >
                        {userInfo?.position === "user"
                          ? userInfo?.firstName + " " + userInfo.lastName
                          : userInfo?.position === "company"
                          ? userInfo?.nameCompany
                          : null}
                      </p>
                      <p className=" text-indigo-500 text-base font-medium">
                        {userInfo?.position === "company" ? "(Công ty)" : null}
                      </p>

                      <DownOutlined />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : null}
        </div>
      </nav>
    </main>
  );
};

export default Nav;
