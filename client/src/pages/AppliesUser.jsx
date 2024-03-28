import { useSelector } from "react-redux";
import {
  CartSquare,
  Description,
  Footer,
  Nav,
  TableSelect,
} from "../components";
import { useGetAppliesUserIDQuery } from "../slices/applyApiSlice";
import { useMemo } from "react";
import { Popover, Progress, Tag } from "antd";
import { convertDateFormat } from "../constants/convertData";
import { useGetCompanyItemQuery } from "../slices/usersApiSlice";
import { CardHorizontalSkeleton } from "../components/Shared/Skeleton";
import { CartCompanySquare, CompanyCart } from "../components/company";

const TableIntro = () => {
  const colorStatus = {
    await: "#e1d2ff",
    confirm: "#c4e6b8",
    cancel: "#fde1ac",
    schedule: "#bae5f5",
  };
  return (
    <div className="flex gap-5">
      <div className="w-1/2 p-5 border-2 border-gray-200">
        <div className="flex flex-col">
          <Progress
            percent={80}
            showInfo={false}
            strokeColor={colorStatus.await}
          />
          <p className="font-medium">&#8226; Chờ xác nhận</p>
        </div>

        <div className="flex flex-col">
          <Progress
            percent={80}
            showInfo={false}
            strokeColor={colorStatus.confirm}
          />
          <p className="font-medium">&#8226; Đã xác nhận</p>
        </div>
      </div>
      <div className="w-1/2 p-5 border-2 border-gray-200">
        <div className="flex flex-col">
          <Progress
            percent={80}
            showInfo={false}
            strokeColor={colorStatus.cancel}
          />
          <p className="font-medium">&#8226; Đã hủy</p>
        </div>

        <div className="flex flex-col">
          <Progress
            percent={80}
            showInfo={false}
            strokeColor={colorStatus.schedule}
          />
          <p className="font-medium">&#8226; Đã được lên lịch</p>
        </div>
      </div>
    </div>
  );
};

const CardCompany = ({ id }) => {
  const { data: dataCompany, isLoading: isLoadingDataCompany } =
    useGetCompanyItemQuery(id);
  return (
    <div>
      {dataCompany && (
        <CartCompanySquare
          id={dataCompany._id}
          avatar={dataCompany.avatar}
          name={dataCompany.nameCompany || ""}
          coverImg={dataCompany.coverImg}
          industry={dataCompany.industryCompany}
          address={dataCompany.address}
          nationality={dataCompany.nationality}
        />
      )}
    </div>
  );
};
const CardCompaniesList = ({ listId }) => {
  const listIdCompact = useMemo(() => {
    return listId?.filter((id, idx) => listId.indexOf(id) === idx);
  }, [listId]);
  return (
    <div className="space-y-4 max-h-[800px] overflow-y-scroll no-scrollbar ">
      {listIdCompact?.map((id, idx) => (
        <CardCompany id={id} key={idx} />
      ))}
    </div>
  );
};

const AppliesUser = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: dataApply } = useGetAppliesUserIDQuery(userInfo?._id);
  const dataItemsDesc = function (dataI) {
    const result = [
      {
        key: "1",
        span: 2,
        label: "Tên",
        children: (
          <p className="w-100 truncate text-green-500 font-medium">
            {dataI?.name}
          </p>
        ),
      },
      {
        key: "2",
        span: 2,
        label: "Url apply",
        children: (
          <a
            href={dataI?.urlApply}
            className=" italic text-indigo-500 truncate "
          >
            {dataI?.urlApply}
          </a>
        ),
      },
      {
        key: "3",
        label: "Số lượng",
        children: <p className="w-16">{dataI?.quantity} người</p>,
      },
      {
        key: "4",
        label: "Kinh nghiệm tối thiểu",
        children: <p className="w-16">{dataI?.experience} năm</p>,
      },
      {
        key: "5",
        label: "Ngày Tạo",
        // span: 2,
        children: (
          <p className="w-16 font-medium text-indigo-500 ">
            {convertDateFormat(dataI?.createdAt)}
          </p>
        ),
      },
      {
        key: "6",
        label: "Hạn nộp",
        // span: 2,
        children: (
          <p className="w-16 font-medium text-red-500">
            {convertDateFormat(dataI?.deadline)}
          </p>
        ),
      },
      {
        key: "7",
        label: "Mức độ",
        children: (
          <div className="w-32 flex flex-wrap gap-1 ">
            {dataI?.level?.map((item, idx) => (
              <Tag key={idx} color="geekblue">
                {item}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        key: "8",
        label: "Kỹ năng",
        children: (
          <div className="w-56 flex flex-wrap gap-1 ">
            {dataI?.skills?.map((item, idx) => (
              <Tag key={idx} color="geekblue">
                {item}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        key: "9",
        label: "Hợp đồng",
        children: (
          <div className="w-30 flex flex-wrap gap-1 ">
            {dataI?.contract?.map((item, idx) => (
              <Tag key={idx} color="geekblue">
                {item}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        key: "10",
        label: "Loại công việc",
        children: (
          <div className="w-30 flex flex-wrap gap-1 ">
            {dataI?.typeJob?.map((item, idx) => (
              <Tag key={idx} color="geekblue">
                {item}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        key: "11",
        label: "Phỏng vấn",
        span: 2,
        children: (
          <div className="max-h-16 overflow-y-scroll no-scrollbar">
            {dataI?.interviewProcess?.map((interview, idx) => (
              <section key={idx} className="flex gap-3">
                <p className="w-24 font-medium">Vòng {idx + 1} :</p>
                <p className="w-80">{interview}</p>
              </section>
            ))}
          </div>
        ),
      },
      {
        key: "12",
        label: "Địa chỉ",
        span: 2,
        children: (
          <div className="max-h-16 overflow-y-scroll no-scrollbar">
            {dataI?.locations?.map((location, idx) => (
              <section key={idx} className="flex gap-3">
                <p className="w-20  font-medium">Địa điểm {idx + 1} :</p>
                <p className="w-80">{location}</p>
              </section>
            ))}
          </div>
        ),
      },
      {
        key: "13",
        label: "Yêu cầu",
        span: 2,
        children: (
          <div className="max-h-16 overflow-y-scroll no-scrollbar">
            {dataI?.request?.map((item, idx) => (
              <section key={idx} className="flex gap-3 w-80">
                {/* <p className="font-medium">Vòng {idx} :</p> */}
                <p className="">&#8226; {item}</p>
              </section>
            ))}
          </div>
        ),
      },
      {
        key: "14",
        label: "Phúc lợi",
        span: 2,
        children: (
          <div className="max-h-16 overflow-y-scroll no-scrollbar">
            {dataI?.benefit?.map((item, idx) => (
              <section key={idx} className="flex w-80 gap-3">
                {/* <p className="font-medium">Vòng {idx} :</p> */}
                <p className="">&#8226; {item}</p>
              </section>
            ))}
          </div>
        ),
      },
    ];
    return result;
  };

  const listCompanyID = useMemo(() => {
    return dataApply?.map((apply) => apply?.companyID);
  }, [dataApply]);

  const colorStatus = {
    await: "#e1d2ff",
    confirm: "#c4e6b8",
    cancel: "#fde1ac",
    schedule: "#bae5f5",
  };

  return (
    <main>
      <Nav />
      <section className="py-24 min-h-screen bg-[#F0F2F5] px-36">
        {/* header */}
        <p className="text-lg text-indigo-600 font-medium uppercase mt-0 mb-4 ">
          Các công việc đã được lên lịch phỏng vấn
          <span className="mx-3 px-3 py-2 bg-indigo-100 text-lg font-medium border-2 border-solid border-indigo-300">
            {dataApply?.length > 0 && dataApply.length}
          </span>
        </p>

        {/* body */}
        <div className="w-full flex gap-x-4">
          {/* left */}
          <div className="min-h-72 p-7 w-2/3 rounded-lg bg-white shadow-md flex flex-col gap-5">
            <TableIntro />

            <div className="flex gap-10">
              <div className={`bg-[#e1d2ff] w-full h-3`}></div>
              <div className={`bg-[#c4e6b8] w-full h-3`}></div>
              <div className={`bg-[#fde1ac] w-full h-3`}></div>
              <div className={`bg-[#bae5f5] w-full h-3`}></div>
            </div>

            <div className="">
              <div className=" space-y-4">
                {dataApply?.map((item, idx) => (
                  <div key={idx}>
                    <CartSquare
                      idCompany={item.companyID}
                      idPost={item.post._id}
                      name={item.post.name}
                      to={item.post.deadline}
                      from={item.post.createdAt}
                      skills={item.post.skills}
                      salary={item.post.maxSalary}
                      status={item.status}
                      interviewSchedule={item.interviewSchedule}
                      modals
                      dataModal={
                        <Description
                          items={dataItemsDesc(item.post)}
                          layout="horizontal"
                          column={4}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-1/3 min-h-72 py-7 px-5 rounded-lg bg-white shadow-md space-y-3">
            <p className=" capitalize text-xl font-medium text-indigo-500 pb-1 border-b border-indigo-500">
              Các công ty đã ứng tuyển
            </p>

            <div className="">
              <CardCompaniesList listId={listCompanyID} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AppliesUser;
