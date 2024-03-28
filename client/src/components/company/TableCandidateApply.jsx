import { IoSearch } from "react-icons/io5";
import InputControl from "../InputControl";
import { Select, Tabs } from "antd";
import { useMemo, useState } from "react";
import { sortBy } from "../../constants";
import { useGetAppliesCompanyIDQuery } from "../../slices/applyApiSlice";
import { useSelector } from "react-redux";
import CartApply from "./CartApply";
import Image from "../Image";

const TableCandidateApply = () => {
  const [sortByJobs, setSortByJobs] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: dataApplies } = useGetAppliesCompanyIDQuery(userInfo._id, {
    refetchOnMountOrArgChange: true,
  });

  const dataFilterSuccessful = useMemo(() => {
    return dataApplies?.filter((item) => item?.status === "successful");
  }, [dataApplies]);

  const dataFilterCancel = useMemo(() => {
    return dataApplies?.filter((item) => item?.status === "cancel");
  }, [dataApplies]);

  const dataFilterScheduled = useMemo(() => {
    return dataApplies?.filter((item) => item?.status === "scheduled");
  }, [dataApplies]);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Tổng cộng (s)",
      children: (
        <div className="flex flex-col gap-3">
          {dataApplies && dataApplies.length > 0 ? (
            dataApplies?.map((apply, idx) => (
              <div key={idx} className="">
                <CartApply
                  name={apply?.name}
                  cv={apply?.cv}
                  phone={apply?.phone}
                  intro={apply?.intro}
                  status={apply?.status}
                  timeApply={apply?.createdAt}
                  post={apply?.post}
                  email={apply?.email}
                  idApply={apply?._id}
                />
              </div>
            ))
          ) : (
            <Image
              src="./src/assets/emptyData.jpg"
              alt="empty-data"
              className="w-80 mx-auto"
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Đã xác nhận",
      children: (
        <div className="flex flex-col gap-3">
          {dataFilterSuccessful?.length > 0 ? (
            dataFilterSuccessful?.map((apply, idx) => {
              if (apply?.status === "successful")
                return (
                  <div key={idx} className="">
                    <CartApply
                      name={apply?.name}
                      cv={apply?.cv}
                      phone={apply?.phone}
                      intro={apply?.intro}
                      status={apply?.status}
                      timeApply={apply?.createdAt}
                      post={apply?.post}
                      email={apply?.email}
                    />
                  </div>
                );
              return "";
            })
          ) : (
            <Image
              src="./src/assets/emptyData.jpg"
              alt="empty-data"
              className="w-80 mx-auto"
            />
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Từ chối",
      children: (
        <div className="flex flex-col gap-3">
          {dataFilterCancel?.length > 0 ? (
            dataFilterCancel?.map((apply, idx) => {
              if (apply?.status === "cancel")
                return (
                  <div key={idx} className="">
                    <CartApply
                      name={apply?.name}
                      cv={apply?.cv}
                      phone={apply?.phone}
                      intro={apply?.intro}
                      status={apply?.status}
                      timeApply={apply?.createdAt}
                      post={apply?.post}
                      email={apply?.email}
                    />
                  </div>
                );
              return "";
            })
          ) : (
            <Image
              src="./src/assets/emptyData.jpg"
              alt="empty-data"
              className="w-80 mx-auto"
            />
          )}
        </div>
      ),
    },
    {
      key: "4",
      label: "Đã Đặt Lịch Hẹn",
      children: (
        <div className="flex flex-col gap-3">
          {dataFilterScheduled?.length > 0 ? (
            dataFilterScheduled?.map((apply, idx) => {
              if (apply?.status === "scheduled")
                return (
                  <div key={idx} className="">
                    <CartApply
                      name={apply?.name}
                      cv={apply?.cv}
                      phone={apply?.phone}
                      intro={apply?.intro}
                      status={apply?.status}
                      timeApply={apply?.createdAt}
                      post={apply?.post}
                      email={apply?.email}
                    />
                  </div>
                );
              return "";
            })
          ) : (
            <Image
              src="./src/assets/emptyData.jpg"
              alt="empty-data"
              className="w-80 mx-auto"
            />
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      {/* header */}
      <div className="flex-between">
        <div className="flex-between p-2 my-4 mx-2 rounded-md bg-indigo-50">
          <div className="text-xl  font-medium text-gray-500">
            <IoSearch />
          </div>
          <InputControl
            type="text"
            name="search"
            styles=" !focus:outline-none !rounded-md py-0 !border-none w-48"
            placeholder="Tìm kiếm bài đăng..."
          />
        </div>
        <div className="flex-center gap-2">
          <div className="text-base font-normal text-gray-500 ">Sắp xếp :</div>
          <Select
            placeholder="Sắp xếp theo"
            style={{
              width: "120px",
              height: "40px",
              border: "1px solid gray",
              borderRadius: "6px",
            }}
            allowClear
            value={sortByJobs}
            onChange={(val) => setSortByJobs(val)}
            options={sortBy?.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        </div>
      </div>
      {/* body */}
      <div className="border-2 border-solid border-gray-200 p-6 rounded-md ">
        <div className="">
          <Tabs
            defaultActiveKey="1"
            items={items}
            type="card"
            onChange={onChange}
          />
          {/* <p className="font-medium text-orange-600">Các ứng viên</p> */}
        </div>
      </div>
    </div>
  );
};

export default TableCandidateApply;
