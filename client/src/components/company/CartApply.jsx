import Image from "../Image";
import { FaPlus, FaCheck, FaClock } from "react-icons/fa6";
import { FaPhoneAlt, FaRegEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
// import { MdOutlineFileDownload } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdEmail, MdDeleteForever } from "react-icons/md";
import { Modal, Popconfirm, Popover, Tooltip } from "antd";
import Swal from "sweetalert2";
import {
  useConformApplyMutation,
  useRejectApplyMutation,
} from "../../slices/applyApiSlice";
// import { Link } from "react-router-dom";
import { URL_Server } from "../../api/api";
import { useState } from "react";
import { convertDateFormat } from "../../constants/convertData";
import FormSchedule from "./FormSchedule";
import { useGetUserItemQuery } from "../../slices/usersApiSlice";

const CartApply = ({
  name,
  cv,
  phone,
  intro,
  status,
  email,
  timeApply,
  post,
  applyID,
  userID,
}) => {
  const [conformApply] = useConformApplyMutation({
    refetchOnMountOrArgChange: true,
  });
  const [rejectApply] = useRejectApplyMutation({
    refetchOnMountOrArgChange: true,
  });
  const [openFormSchedule, setOpenFormSchedule] = useState(false);

  const { data: dataUser } = useGetUserItemQuery(userID, {
    refetchOnMountOrArgChange: true,
  });
  const handleConfirm = async () => {
    try {
      await conformApply(applyID).unwrap();
      Swal.fire({
        title: "Xác nhận",
        text: "Xác nhận thông tin ứng tuyển thành công",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Xác nhận",
        text: "Xác nhận thông tin ứng tuyển thất bại",
        icon: "error",
      });
    }
  };

  const handleRejectApply = async () => {
    try {
      await rejectApply(applyID).unwrap();
      Swal.fire({
        title: "Từ chối",
        text: "Từ chối đơn ứng tuyển thành công",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Từ chối",
        text: "Từ chối đơn ứng tuyển thất bại",
        icon: "error",
      });
    }
  };
  return (
    <>
      <div
        className="w-full p-5 bg-slate-50 rounded-md shadow-sm flex-center gap-2 border-2 border-solid border-indigo-100
        hover:border-indigo-300
        "
      >
        <div className="w-2/12 flex-center">
          <div className="bg-white relative shadow-md rounded-full flex-center w-24 h-24 p-[2px] border">
            <Image
              src={dataUser?.avatar}
              alt="avatar"
              className="rounded-full h-full w-full object-contain object-center "
            />
          </div>
        </div>

        <div className="w-8/12 flex flex-col gap-3">
          <div className="flex gap-1">
            <p className="font-medium text-base">{name}</p>
            <div className="font-medium text-xs ">
              {status === "await" ? (
                <p className="bg-amber-300 text-white px-2 py-1 mx-2  rounded-md">
                  Đang chờ
                </p>
              ) : status === "successful" ? (
                <p className="bg-[#0BC1B6] text-white px-2 py-1 mx-2  rounded-md">
                  Đã xác nhận
                </p>
              ) : status === "scheduled" ? (
                <p className="bg-indigo-500 text-white px-2 py-1 mx-2  rounded-md">
                  Đã lên lịch hẹn
                </p>
              ) : status === "cancel" ? (
                <p className="bg-red-400 text-white px-2 py-1 mx-2  rounded-md">
                  Đã hủy
                </p>
              ) : (
                ""
              )}
            </div>
            <Popover
              content={<p className="flex flex-col flex-wrap">mkasdkdakms</p>}
              // title="Title"
            >
              <p className="px-2 py-1 rounded-md border-2 border-solid border-gray-400 hover:bg-black hover:text-white">
                <SlEnvolopeLetter />
              </p>
            </Popover>
          </div>
          <div className="">
            <p className="text-indigo-500 overflow-hidden font-medium">
              {post?.name}
            </p>
          </div>

          <div className="flex gap-5 ">
            <div className="flex-center gap-2">
              <p className=" font-medium text-indigo-600">
                <FaPhoneAlt />
              </p>
              <p className="text-base">{phone}</p>
            </div>
            <div className="flex-center gap-2">
              <p className="text-lg font-medium text-indigo-600">
                <MdEmail />
              </p>
              <p className="text-base">{email}</p>
            </div>
            <div className="flex-center gap-2">
              <p className="text-base font-medium text-indigo-600">
                <FaClock />
              </p>
              <p className="text-base">{convertDateFormat(timeApply)}</p>
            </div>
          </div>
        </div>

        <div className="w-2/12 flex flex-col gap-4 mx-1">
          <div className="flex flex-col items-end mb-6">
            <p
              className="italic flex-center gap-2 text-indigo-500 px-2 py-1  border-b-2 border-solid border-indigo-300
              hover:bg-indigo-500 hover:text-white hover:border-indigo-500 cursor-pointer "
              onClick={() => {
                window.open(
                  `${URL_Server}/files/${cv.pdf}`,
                  "_blank",
                  "noreferrer"
                );
              }}
            >
              <span>
                <FaRegEye />
              </span>{" "}
              Xem CV
            </p>
          </div>
          <div className="w-full flex gap-4 items-end ml-7">
            {status === "scheduled" ? (
              <>
                <Tooltip title="Đã tạo lịch hẹn">
                  <button
                    className="p-2 text-sm bg-gray-300 rounded-md shadow-sm"
                    disabled
                  >
                    <FaPlus />
                  </button>
                </Tooltip>
                <Tooltip title="Xác nhận">
                  <butotn
                    className="p-2 text-sm bg-gray-300 rounded-md shadow-sm"
                    disabled
                  >
                    <FaCheck />
                  </butotn>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Tạo lịch hẹn">
                  <button
                    className="p-2 text-sm bg-orange-200 rounded-md cursor-pointer active:translate-y-1 shadow-sm"
                    onClick={() => setOpenFormSchedule(true)}
                  >
                    <FaPlus />
                  </button>
                </Tooltip>

                <Tooltip title="Xác nhận">
                  <butotn
                    className="p-2 text-sm bg-orange-200 rounded-md cursor-pointer active:translate-y-1 shadow-sm"
                    onClick={handleConfirm}
                  >
                    <FaCheck />
                  </butotn>
                </Tooltip>
              </>
            )}

            <Tooltip title="Từ chối | xóa">
              <Popconfirm
                title="Hủy đơn ứng tuyển"
                description="Có chắc chắn muốn hủy?"
                cancelText="Hủy"
                okText="Đồng ý"
                icon={
                  <MdDeleteForever
                    style={{
                      color: "red",
                      fontSize: "23px",
                    }}
                  />
                }
                onConfirm={handleRejectApply}
              >
                <button className="p-2 text-sm bg-orange-200 rounded-md cursor-pointer active:translate-y-1 shadow-sm">
                  <IoMdClose />
                </button>
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      </div>

      <Modal
        title={
          <p className="text-lg pb-3 border-b-2 border-solid border-orange-200">
            Đặt lịch hẹn phỏng vấn với
            <span className="mx-1 font-bold text-orange-500">{name}</span>
            với công việc
            <span className="mx-1 font-bold text-orange-500">{post?.name}</span>
          </p>
        }
        centered
        open={openFormSchedule}
        // onOk={() => setOpenFormApply(false)}
        onCancel={() => setOpenFormSchedule(false)}
        width={1000}
        okType="primary"
        footer={null}
      >
        {/* <FormApply
          companyID={dataCompany?._id}
          post={dataPost}
          modalClose={(data) => setOpenFormApply(data)}
        /> */}
        <FormSchedule
          modalClose={(data) => setOpenFormSchedule(data)}
          applyID={applyID}
        />
      </Modal>
    </>
  );
};

export default CartApply;
