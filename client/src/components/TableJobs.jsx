import { Collapse, Popconfirm, Popover, Select, Tag, Tooltip } from "antd";
import InputControl from "./InputControl";
import { IoSearch } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import { sortBy } from "../constants";

import TableSelect from "./TableSelect";
import {
  useDeletePostMutation,
  useGetPostItemWithCompanyQuery,
} from "../slices/postApiSlice";
import { useSelector } from "react-redux";
import { convertDateFormat } from "../constants/convertData";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Description from "./Description";
import { toast } from "react-toastify";
import { FormJobUpdate } from "./company";
import Image from "./Image";
import { BsFire } from "react-icons/bs";

const TableJobs = () => {
  const [sortByJobs, setSortByJobs] = useState(sortBy[0]);
  const [filterDataJobs, setFilterDataJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeJob, setActiveJob] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetPostItemWithCompanyQuery(userInfo._id, {
    refetchOnMountOrArgChange: true,
  });

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const myJobsCol = useMemo(
    () => [
      {
        title: "Tên",
        dataIndex: "name",
        render: (_, filterDataJobs) => (
          <div className="w-72">
            {filterDataJobs.locations[0] ? (
              <Collapse
                items={[
                  {
                    key: filterDataJobs.name,
                    label: (
                      <div className="flex items-center gap-x-1">
                        {filterDataJobs.urgentRecruitment && (
                          <Tooltip placement="top" title="Tuyển gấp">
                            <p className=" text-red-500">
                              <BsFire />
                            </p>
                          </Tooltip>
                        )}
                        <p
                          className={`text-xm font-medium line-clamp-2 ${
                            filterDataJobs.urgentRecruitment
                              ? "text-orange-500"
                              : ""
                          } `}
                        >
                          {filterDataJobs.name}
                        </p>
                      </div>
                    ),
                    children: (
                      <ul>
                        {filterDataJobs.locations.map((location, idx) => (
                          <li className="text-slate-500 list-disc" key={idx}>
                            {location}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                ]}
                ghost
                size="small"
              />
            ) : (
              <>
                <p className="text-xm font-medium line-clamp-2">
                  {filterDataJobs.name}
                </p>
              </>
            )}
          </div>
        ),
      },
      {
        title: "Ứng tuyển",
        dataIndex: "apply",
        render: (_, filterDataJobs) => (
          <div>
            <p className="text-xm   w-24 mx-auto">
              {filterDataJobs.apply === 0
                ? "Chưa có ứng viên"
                : `${filterDataJobs.apply} Ứng viên(s)`}
            </p>
          </div>
        ),
      },
      {
        title: "Ngày tạo & Hạn nộp",
        dataIndex: "createdAndDeadline",
        render: (_, filterDataJobs) => (
          <div className="w-44">
            <p className="   w-full mx-auto flex-between">
              Ngày tạo :
              <span className=" ">
                {convertDateFormat(filterDataJobs.createdAt)}
              </span>
            </p>
            <p className="  w-full mx-auto flex-between">
              Ngày kết thúc :
              <span className=" ">
                {convertDateFormat(filterDataJobs.deadline)}
              </span>
            </p>
          </div>
        ),
      },
      {
        title: "Cần tuyển",
        dataIndex: "quantity",
        render: (_, filterDataJobs) => (
          <div className="flex-center">
            <p className="">{filterDataJobs.quantity}</p>
          </div>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (_, filterDataJobs) => (
          <div className="px-2  border border-green-300 rounded bg-green-100">
            <p className=" text-green-600">
              {filterDataJobs.status === "Successful" && "Thành công"}
            </p>
          </div>
        ),
      },
      {
        title: "Thao tác",
        dataIndex: "action",
        render: (_, filterDataJobs) => (
          <div className="flex-between gap-2">
            {/* see detail */}
            <Popover
              placement="left"
              content={
                <Description
                  items={dataItemsDesc(filterDataJobs)}
                  title="Thông tin bài tuyển dụng"
                  layout="horizontal"
                  column={4}
                />
              }
              // title="Title"
              trigger="click"
            >
              <div className="p-1 bg-violet-100 rounded-md cursor-pointer hover:bg-violet-300 hover:!text-white text-lg text-violet-500 ">
                <FaRegEye />
              </div>
            </Popover>
            {/* edit */}
            <div
              className="p-1 bg-blue-100 rounded-md cursor-pointer hover:bg-blue-300 hover:!text-white text-lg text-blue-500"
              onClick={() => {
                setOpenDrawer(true);
                setActiveJob(filterDataJobs);
              }}
            >
              <FaEdit />
            </div>
            {/* delete */}
            <Popconfirm
              placement="left"
              okText="Yes"
              okType="primary"
              title="Xóa đơn ứng tuyển"
              description="Bạn có chắc chắn không?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                handleDeleteJob(filterDataJobs._id);
              }}
            >
              <div className="p-1 bg-red-100 rounded-md cursor-pointer hover:bg-red-300 hover:!text-white text-lg text-red-500">
                <RiDeleteBin5Line />
              </div>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [filterDataJobs]
  );

  const [deletePost] = useDeletePostMutation();

  const handleDeleteJob = async (jobId) => {
    console.log(jobId);
    try {
      await deletePost(jobId);
      toast.success("Xóa bài tuyển dụng thành công");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  // [convertDateFormat(item.createdAt),convertDateFormat(item.deadline)],
  const dataTable = useMemo(() => {
    let result;
    if (filterDataJobs?.length > 0) {
      result = filterDataJobs?.map((item, idx) => ({
        key: idx,
        ...item,
      }));
    } else {
      result = data?.map((item, idx) => ({
        key: idx,
        ...item,
      }));
    }

    return result;
  }, [filterDataJobs, data]);

  const dataItemsDesc = function (dataI) {
    const result = [
      {
        key: "1",
        span: 2,
        label: "Tên",
        children: (
          <div>
            <p className="w-100 truncate text-orange-500 font-medium">
              {dataI?.name}
            </p>
          </div>
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

  const handleTextSearch = () => {
    const result = data.filter((jobI) => {
      let name = jobI.name.toLowerCase();
      return name.includes(searchText.toLowerCase());
    });
    setFilterDataJobs(result);
    console.log(filterDataJobs, result);
  };

  useEffect(() => {
    setFilterDataJobs(data);
  }, []);

  useEffect(() => {
    if (data) {
      let dataI = [...data];
      switch (sortByJobs) {
        case "all":
          setFilterDataJobs(dataI);
          break;

        case "name":
          dataI.sort((a, b) => {
            const nameA = a.name.toUppercase;
            const nameB = b.name.toUppercase;
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          setFilterDataJobs(dataI);
          break;

        case "newest":
          dataI.sort((a, b) => a.createdAt - b.createdAt);
          setFilterDataJobs(dataI);
          break;

        case "quantity":
          dataI.sort((a, b) => a.quantity - b.quantity);
          setFilterDataJobs(dataI);
          break;

        default:
          setFilterDataJobs(dataI);
          break;
      }
    }
  }, [sortByJobs, data]);
  return (
    <main className="">
      {/* search */}
      <div className="flex-between">
        <div className="flex-between p-3 my-2 rounded-md bg-indigo-50">
          <input
            type="text"
            name="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Tìm kiếm bài đăng..."
            className="w-80 h-11 focus:outline-none border-none px-3 rounded-s shadow bg-white"
          />
          <button
            className="text-xl p-3 bg-slate-300   font-medium text-gray-500 rounded-e hover:bg-slate-400 hover:text-gray-600 shadow"
            onClick={handleTextSearch}
          >
            <IoSearch />
          </button>
        </div>

        <div className="flex-center gap-2">
          <div className="text-base font-normal text-gray-500 ">Sắp xếp :</div>
          <Select
            placeholder="Chọn lựa chọn"
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
      {/* table */}
      <div className="my-3">
        {data ? (
          <TableSelect columns={myJobsCol} dataSource={dataTable} />
        ) : (
          <Image
            src="./src/assets/emptyData.jpg"
            alt="empty-data"
            className="w-80 mx-auto"
          />
        )}

        {openDrawer && (
          <FormJobUpdate
            open={openDrawer}
            onClose={onCloseDrawer}
            width={720}
            title="Chỉnh sửa bài tuyển dụng"
            val={activeJob}
          />
        )}
      </div>
    </main>
  );
};

export default TableJobs;
