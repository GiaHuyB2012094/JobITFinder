import { BsBack } from "react-icons/bs";
import {
  convertDateFormat,
  currencyFormat,
  formatDateTime,
} from "../constants/convertData";
import { Modal, Tooltip } from "antd";
import { useMemo, useState } from "react";
import { useGetCompanyItemQuery } from "../slices/usersApiSlice";
import Image from "./Image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { Link } from "react-router-dom";

const CartSquare = ({
  idCompany,
  idPost,
  icon,
  name,
  to,
  from,
  skills,
  salary,
  // color,
  modals,
  status,
  interviewSchedule,
  dataModal,
}) => {
  const [open, setOpen] = useState(false);

  const [isOpenShowSchedule, setIsOpenShowSchedule] = useState(false);

  const { data: dataCompany } = useGetCompanyItemQuery(idCompany);

  const colorStatus = {
    await: "#e1d2ff",
    confirm: "#c4e6b8",
    cancel: "#fde1ac",
    schedule: "#bae5f5",
  };

  const color = useMemo(() => {
    if (status === "scheduled") return colorStatus.schedule;
    if (status === "successful") return colorStatus.confirm;
    if (status === "cancel") return colorStatus.cancel;
    if (status === "await") return colorStatus.await;
  }, [status]);

  const handleShowSchedule = () => {
    setIsOpenShowSchedule(true);
  };
  return (
    <main
      className={`flex items-center gap-x-3 w-full h-28 border shadow-md shadow-[${color}]`}
    >
      <div className={`bg-[${color}] w-4 h-full`}></div>
      {/* avatar */}
      <Link
        to={`/job-detail/${idPost}/${dataCompany?.nameCompany}`}
        className="h-4/5 flex items-center "
      >
        <Image
          src={dataCompany?.avatar}
          alt={idCompany}
          className="w-24 h-fit"
        />
      </Link>

      <div className="h-full w-4/5 py-1 px-2 space-y-1">
        <div className="flex gap-2 ">
          <Link
            to={`/job-detail/${idPost}/${dataCompany?.nameCompany}`}
            className="text-base font-medium h-7 w-80 truncate"
          >
            {name}
          </Link>

          {status === "scheduled" && (
            <>
              <p className="text-sm px-1 h-fit rounded bg-indigo-100 border border-indigo-200 text-sky-600">
                Đã lên lịch
              </p>
              <Tooltip placement="top" title="Xem lịch hẹn">
                <p
                  className="text-xl font-medium cursor-pointer"
                  onClick={handleShowSchedule}
                >
                  {icon || <BsBack />}
                </p>
              </Tooltip>
            </>
          )}

          {status === "successful" && (
            <p className="text-sm px-1 h-fit rounded bg-green-100 border border-green-200 text-green-600">
              Đã xác nhận
            </p>
          )}
          {status === "cancel" && (
            <p className="text-sm px-1 h-fit rounded bg-amber-100 border border-amber-200 text-amber-600">
              Hủy
            </p>
          )}
          {status === "await" && (
            <p className="text-sm px-1 h-fit rounded bg-violet-100 border border-violet-200 text-violet-600">
              Chờ xác nhận
            </p>
          )}
        </div>

        <div className="flex text-sm items-center justify-start gap-x-2">
          <p className=" font-medium text-gray-600">
            <GrMoney />
          </p>
          <p className="font-medium text-green-500">{currencyFormat(salary)}</p>
        </div>

        <p className="text-sm flex items-center gap-x-2 text-gray-500">
          {convertDateFormat(to)} <FaLongArrowAltRight />
          {convertDateFormat(from)}
        </p>

        <div className="flex gap-3 flex-wrap w-full overflow-hidden">
          {skills &&
            skills.map((item, idx) => (
              <p
                key={idx}
                className="text-sm px-2  rounded bg-indigo-100 border border-indigo-200 text-sky-600"
              >
                {item}
              </p>
            ))}
        </div>
      </div>

      <div className="h-full flex items-end">
        <div className={`w-32 border-l-2  px-4 gap-x-2 bg-[${color}]`}>
          {modals && (
            <>
              <p
                onClick={() => setOpen(true)}
                className="text-sm italic  cursor-pointer 
                        hover:font-medium hover:text-indigo-700"
              >
                xem chi tiết
              </p>
            </>
          )}
        </div>
      </div>
      {/* modal */}
      <Modal
        title={
          <p className="text-lg pb-3 border-b-2 border-dashed mb-6 border-indigo-200 text-indigo-500">
            Thông tin chi tiết
          </p>
        }
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1300}
        okType="primary"
        footer={null}
      >
        {dataModal}
      </Modal>

      <Modal
        title={
          <p className="text-lg pb-3 border-b-2 border-dashed  border-indigo-200 text-indigo-500">
            Thông tin lịch hẹn phỏng vấn
          </p>
        }
        centered
        open={isOpenShowSchedule}
        onCancel={() => setIsOpenShowSchedule(false)}
        width={500}
        okType="primary"
        footer={null}
      >
        <div className="space-y-1">
          <div className="flex pb-2 border-b">
            <p className="text-sm">
              Sau khi xem xét kỹ thì xin chúc mừng bạn đã vượt qua vòng khảo sát
              CV tiếp theo chúng tôi xin mời bạn đến phỏng vấn vòng tiếp theo
            </p>
          </div>

          <div className="flex-between">
            <p className=" text-base font-semibold">Thời gian phỏng vấn</p>
            <p className="pl-5">
              {formatDateTime(interviewSchedule?.interviewTime)}
            </p>
          </div>
          {/* interview */}
          <div className="flex-between">
            <p className=" text-base font-semibold">Hình thức phỏng vấn</p>
            <p className="pl-5">{interviewSchedule?.interview}</p>
          </div>
          {/* phone */}
          <div className="flex-between">
            <p className=" text-base font-semibold">Liên hệ</p>
            <p className="pl-5">{interviewSchedule?.phone}</p>
          </div>

          {/* email */}
          <div className="flex-between">
            <p className=" text-base font-semibold">Email</p>
            <p className="pl-5">{interviewSchedule?.email}</p>
          </div>

          {/* info */}
          {interviewSchedule?.intro && (
            <div className="">
              <p className=" text-base font-semibold">Giới thiệu</p>
              <p className="pl-5">{interviewSchedule?.intro}</p>
            </div>
          )}

          {/* prepare */}
          {interviewSchedule?.prepare && (
            <div className="">
              <p className=" text-base font-semibold">Chuẩn bị</p>
              <p className="pl-5">{interviewSchedule?.prepare}</p>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
};

export default CartSquare;
