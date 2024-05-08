import Image from "../Image";
import { FaPlus, FaCheck, FaClock } from "react-icons/fa6";
import { FaPhoneAlt, FaRegEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
// import { MdOutlineFileDownload } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdEmail, MdDeleteForever } from "react-icons/md";
import { Modal, Popconfirm, Popover, Tooltip } from "antd";
import Swal from "sweetalert2";
import { FaArrowRight } from "react-icons/fa6";
import {
  useConformApplyMutation,
  useRejectApplyMutation,
} from "../../slices/applyApiSlice";
// import { Link } from "react-router-dom";
import { URL_Server } from "../../api/api";
import { useEffect, useState } from "react";
import { convertDateFormat } from "../../constants/convertData";
import FormSchedule from "./FormSchedule";
import { useGetUserItemQuery } from "../../slices/usersApiSlice";
import ConfirmDialog from "../Shared/ConfirmDiaglog/ConfirmDialog";

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
  answerInterviewQuestion,
}) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [isOpenIntro, setIsOpenIntro] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

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

  useEffect(() => {
    const handleRejectApply = async () => {
      if (deleteConfirm) {
        setIsOpenDelete(false);
        setDeleteConfirm(false);

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
      }
    };
    handleRejectApply();
  }, [deleteConfirm]);

  return (
    <>
      <div
        className="w-full p-5 bg-slate-50 rounded-md shadow-sm flex-center gap-2 border-2 border-solid border-orange-100
        hover:border-orange-300
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
                <p className="bg-orange-500 text-white px-2 py-1 mx-2  rounded-md">
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
              content={
                <p className="flex flex-col flex-wrap ">
                  Xem thông tin ứng viên
                </p>
              }
              // title="Title"
            >
              <p
                className="px-2 py-1 cursor-pointer rounded-md border-2 border-solid border-gray-400 hover:bg-black hover:text-white"
                onClick={() => setIsOpenIntro(true)}
              >
                <SlEnvolopeLetter />
              </p>
            </Popover>
          </div>
          <div className="">
            <p className="text-orange-500 overflow-hidden font-medium">
              {post?.name}
            </p>
          </div>

          <div className="flex gap-5 ">
            <div className="flex-center gap-2">
              <p className=" font-medium ">
                <FaPhoneAlt />
              </p>
              <p className="text-base">{phone}</p>
            </div>
            <div className="flex-center gap-2">
              <p className="text-lg font-medium ">
                <MdEmail />
              </p>
              <p className="text-base">{email}</p>
            </div>
            <div className="flex-center gap-2">
              <p className="text-base font-medium ">
                <FaClock />
              </p>
              <p className="text-base">{convertDateFormat(timeApply)}</p>
            </div>
          </div>
        </div>

        <div className="w-2/12 flex flex-col gap-4 mx-1">
          <div className="flex flex-col items-end mb-6">
            <p
              className="italic flex-center gap-2 text-orange-500 px-2 py-1  border rounded-md border-orange-300 shadow-orange-400/40
              hover:bg-orange-500 hover:text-white hover:border-orange-500 cursor-pointer "
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
                    className="p-2 text-sm border border-slate-300 rounded-md cursor-pointer active:translate-y-1 shadow-sm"
                    onClick={() => setOpenFormSchedule(true)}
                  >
                    <FaPlus />
                  </button>
                </Tooltip>

                <Tooltip title="Xác nhận">
                  <butotn
                    className="p-2 text-sm border border-slate-300 rounded-md cursor-pointer active:translate-y-1 shadow-sm"
                    onClick={handleConfirm}
                  >
                    <FaCheck />
                  </butotn>
                </Tooltip>
              </>
            )}

            <Tooltip title="Từ chối | xóa">
              <button
                className="p-2 text-sm border border-slate-300 rounded-md cursor-pointer active:translate-y-1 shadow-sm"
                onClick={() => setIsOpenDelete(true)}
              >
                <IoMdClose />
              </button>
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
        <FormSchedule
          modalClose={(data) => setOpenFormSchedule(data)}
          applyID={applyID}
        />
      </Modal>

      <Modal
        title={
          <p className="text-lg pb-3 border-b-2 border-solid border-orange-200">
            Thông tin ứng viên & câu trả lời phỏng vấn
          </p>
        }
        centered
        open={isOpenIntro}
        // onOk={() => setOpenFormApply(false)}
        onCancel={() => setIsOpenIntro(false)}
        width={700}
        okType="primary"
        footer={null}
      >
        <div className="space-y-3">
          <div className="">
            <p className=" capitalize font-medium text-orange-500 text-base ">
              Thư giới thiệu
            </p>
            <p className="ml-3">{intro}</p>
          </div>
          {answerInterviewQuestion && (
            <div className="">
              <p className=" capitalize font-medium text-orange-500 text-base ">
                Trả lời câu hỏi phỏng vấn
              </p>
              {answerInterviewQuestion.map((question, idx) => (
                <div key={idx} className="space-y-1 ml-3">
                  <p className=" text-black">
                    {idx + 1}. {question.name}
                  </p>
                  <p className="text-slate-500 text-sm pl-3 flex items-center gap-x-2">
                    <FaArrowRight />
                    {question.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* confirm delete */}
      <ConfirmDialog
        open={isOpenDelete}
        setOpen={(data) => setIsOpenDelete(data)}
        deleteConfirm={(data) => setDeleteConfirm(data)}
      />
    </>
  );
};

export default CartApply;
