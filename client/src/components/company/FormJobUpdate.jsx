import { Drawer, Select, Space, Tag } from "antd";
import Button from "../Button";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../resume/ImageUpload";
import InputControl from "../InputControl";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { convertToHTML } from "draft-convert";
import { contracts, gender, levelList, typeJobs } from "../../constants";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { formatDateYYYYMMDD } from "../../constants/convertData";
import DOMPurify from "dompurify";
import { useUpdatePostMutation } from "../../slices/postApiSlice";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={"blue"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      value={value}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};
const prefix = "$";
const FormJobUpdate = memo(({ open, onClose, width, title, val }) => {
  const [isUpload, setIsUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(val.imgPost || []);
  const [skills, setSkills] = useState(val.skills || []);
  const [level, setLevel] = useState(val.level || []);
  const [contract, setContract] = useState(val.contract || []);
  const [genderCandidate, setGenderCandidate] = useState(val.gender || null);
  const [typejob, setTypeJob] = useState(val.typeJob || []);
  const [benefit, setBenefit] = useState(val.benefit || [""]);
  const [request, setRequest] = useState(val.request || [""]);
  const [locations, setLocations] = useState(val.locations || [""]);
  const [minSalary, setMinSalary] = useState(val.minSalary || 100000);
  const [maxSalary, setMaxSalary] = useState(val.maxSalary || 100000);
  const [interviewProcess, setInterviewProcess] = useState(
    val.interviewProcess || [""]
  );
  const [deadlineSubmit, setDeadlineSubmit] = useState(
    formatDateYYYYMMDD(new Date(val.deadline))
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(val.desc || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: val.name,
      experience: val.experience,
      quantity: val.quantity,
      urlApply: val.urlApply,
      email: val.email,
    },
  });
  const { userInfo } = useSelector((state) => state.auth);

  const [updatePost] = useUpdatePostMutation();
  const onSubmit = async (data) => {
    if (!deadlineSubmit) {
      toast.error("Vui lòng chọn thời gian hết hạn của bài tuyển dụng");
      return;
    }
    setIsUpload(true);
    Object.assign(data, {
      company: userInfo._id,
      imgPost: imageUrl,
      skills: skills,
      level: level,
      contract: contract,
      gender: genderCandidate,
      typeJob: typejob,
      benefit: benefit,
      request: request,
      locations: locations,
      interviewProcess: interviewProcess,
      deadline: deadlineSubmit,
      desc: convertedContent,
      minSalary: minSalary,
      maxSalary: maxSalary,
    });
    try {
      await updatePost({
        postId: val._id,
        postBody: data,
      }).unwrap();
      Swal.fire({
        title: "Cập nhật bài tuyển dụng",
        text: "Bài tuyển dụng đã được cập nhật",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Cập nhật bài tuyển dụng",
        text: "Thất bại",
        icon: "error",
      });
      // toast.error(error?.data?.message || error.error)
    }
  };

  //  request
  const handleRequestUpdate = (e, idx) => {
    e.preventDefault();
    const { value } = e.target;
    const valOnChangeRequest = [...request];
    valOnChangeRequest[idx] = value;
    setRequest(valOnChangeRequest);
  };
  const handleRequestClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setRequest((prev) => [...prev, ""]);
  };
  const handleRequestDelete = (e, idx) => {
    e.stopPropagation();
    e.preventDefault();
    if (request.length > 1) {
      var delRequest = [...request];
      delRequest.splice(idx, 1);
      setRequest(delRequest);
    }
  };
  //  benefit
  const handleBenefitUpdate = (e, idx) => {
    e.preventDefault();
    const { value } = e.target;
    const valOnChangeBenefit = [...benefit];
    valOnChangeBenefit[idx] = value;
    setBenefit(valOnChangeBenefit);
  };
  const handleBenefitClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setBenefit((prev) => [...prev, ""]);
  };
  const handleBenefitDelete = (e, idx) => {
    e.preventDefault();
    if (benefit.length > 1) {
      var delBenefit = [...benefit];
      delBenefit.splice(idx, 1);
      setBenefit(delBenefit);
    }
  };

  //  locations
  const handleLocationsUpdate = (e, idx) => {
    e.preventDefault();
    const { value } = e.target;
    const valOnChangeLocations = [...locations];
    valOnChangeLocations[idx] = value;
    setLocations(valOnChangeLocations);
  };
  const handleLocationsClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLocations((prev) => [...prev, ""]);
  };
  const handleLocationsDelete = (e, idx) => {
    e.preventDefault();
    if (locations.length > 1) {
      var delLocations = [...locations];
      delLocations.splice(idx, 1);
      setLocations(delLocations);
    }
  };
  // interview process
  //  locations
  const handleInterviewProcessUpdate = (e, idx) => {
    e.preventDefault();
    const { value } = e.target;
    const valOnChangeInterviewProcess = [...interviewProcess];
    valOnChangeInterviewProcess[idx] = value;
    setInterviewProcess(valOnChangeInterviewProcess);
  };
  const handleInterviewProcessClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setInterviewProcess((prev) => [...prev, ""]);
  };
  const handleInterviewProcessDelete = (e, idx) => {
    e.preventDefault();
    if (interviewProcess.length > 1) {
      var delInterviewProcess = [...interviewProcess];
      delInterviewProcess.splice(idx, 1);
      setInterviewProcess(delInterviewProcess);
    }
  };
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    const text = "<p></p>";
    if (!html.includes(text)) {
      setConvertedContent(html);
    }
  }, [editorState]);

  return (
    <Drawer
      title={title}
      width={width}
      onClose={onClose}
      open={open}
      placement="left"
      styles={{
        body: {
          paddingBottom: 80,
          backgroundColor: "#F0F2F5",
        },
      }}
      extra={
        <Space>
          <Button
            onClick={onClose}
            title="Hủy bỏ"
            roundPrimary
            styles="!border-red-500 !text-red-500"
          />
          <Button onClick={handleSubmit(onSubmit)} title="Cập nhật" />
        </Space>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg">
          <div className=" my-3 w-full">
            <p className="text-base font-medium text-gray-500">
              Tải hình ảnh công việc
            </p>
            <ImageUpload
              isUpload={isUpload}
              passCloudinaryFileImage={(data) => {
                setImageUrl(data);
              }}
              ImageFileLocal={(data) => {
                setImageUrl(data);
              }}
              quantity={8}
              setIsUpload={(data) => {
                setIsUpload(data);
              }}
            />
          </div>
          <div className="flex my-5 flex-col gap-3">
            <p className="text-base font-medium text-gray-500">Tên công việc</p>
            <InputControl
              type="text"
              placeholder="Nhập tên công việc cần tuyển"
              name="name"
              styles=" !focus:outline-none !rounded-md"
              {...register("name", {
                required: "Vui lòng nhập tên công việc đầy đủ",
              })}
              error={errors.name ? errors.name.message : ""}
            />
          </div>
        </div>

        <div className="w-full my-5 bg-white rounded-lg py-5 px-6 shadow-lg">
          <p className="text-base font-medium text-gray-500 ">Mô tả</p>
          <div className="">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
          {val.desc && (
            <div className="flex flex-col gap-3 pt-3">
              <p className="text-lg text-indigo-500 font-medium">
                Nội dung mô tả
              </p>
              <p className="text-base text-red-500">
                *Lưu ý: vui lòng sao chép lại mô tả và dán vào khung mô tả trên
                khi cập nhật
              </p>
              <div
                className="bg-indigo-50 w-full border-2 border-dashed border-indigo-300 rounded-lg py-3 px-5"
                dangerouslySetInnerHTML={createMarkup(val.desc)}
              ></div>
            </div>
          )}
        </div>
        {/*  */}
        <div className="w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg">
          <div className="flex-center my-3 gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">URL Apply</p>
              <InputControl
                type="text"
                placeholder="Nhập link url để ứng tuyển"
                name="urlApply"
                styles=" !focus:outline-none !rounded-md "
                {...register("urlApply")}
              />
            </div>
          </div>
          {/* quantity and experience */}
          <div className="flex-center my-3 gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">Số lượng</p>
              <InputControl
                type="number"
                placeholder="Nhập số lượng muốn tuyển"
                name="quantity"
                styles=" !focus:outline-none !rounded-md"
                {...register("quantity", {
                  required: "Vui lòng nhập số lượng muốn tuyển",
                  valueAsNumber: true,
                })}
                error={errors.quantity ? errors.quantity.message : ""}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">
                Số năm kinh nghiệm
              </p>
              <InputControl
                type="number"
                placeholder="Nhập số năm của công việc cần tuyển"
                name="experience"
                styles=" !focus:outline-none !rounded-md"
                {...register("experience", {
                  required: "Vui lòng nhập số năm của công việc đầy đủ",
                  valueAsNumber: true,
                })}
                error={errors.experience ? errors.experience.message : ""}
              />
            </div>
          </div>
          {/* gender and email */}
          <div className="flex-center my-3 gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">Email Apply</p>
              <InputControl
                type="email"
                placeholder="Nhập địa email tuyển dụng"
                name="email"
                styles=" !focus:outline-none !rounded-md"
                {...register("email", {
                  required: "Vui lòng nhập email tuyển dụng đầy đủ",
                })}
                error={errors.email ? errors.email.message : ""}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">Giới tính</p>
              <Select
                placeholder="Chọn giới tính"
                style={{
                  width: "100%",
                  height: "43px",
                  marginLeft: "10px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                }}
                allowClear
                value={genderCandidate}
                onChange={(val) => setGenderCandidate(val)}
                options={gender?.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
              />
            </div>
          </div>
          {/* Salary */}
          <div className="flex-center my-3 gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">
                Lương tối thiểu
              </p>
              <CurrencyInput
                id="minSalary"
                name="minSalary"
                placeholder="Nhập tiền lương tối thiểu"
                defaultValue={100000}
                decimalsLimit={2}
                value={minSalary}
                className={`w-full  border border-gray-400 !focus:outline-none !rounded-md p-3 my-1 mx-2`}
                onValueChange={(value) => setMinSalary(parseInt(value))}
                prefix={prefix}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">
                Lương tối đa
              </p>
              <CurrencyInput
                id="maxSalary"
                name="maxSalary"
                placeholder="Nhập tiền lương tối thiểu"
                defaultValue={100000}
                decimalsLimit={2}
                value={maxSalary}
                className={`w-full border border-gray-400 !focus:outline-none !rounded-md p-3 my-1 mx-2`}
                onValueChange={(value) => setMaxSalary(parseInt(value))}
                prefix={prefix}
              />
            </div>
          </div>
        </div>

        <div className="w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg">
          {/* skills and contract */}
          <div className="flex-center my-3 gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">Kỹ năng</p>
              <Select
                placeholder="Chọn kỹ năng công ty"
                mode="multiple"
                maxTagCount="responsive"
                tagRender={tagRender}
                value={skills}
                onChange={(value) => setSkills(value)}
                style={{
                  width: "100%",
                  height: "43px",
                  marginLeft: "10px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                }}
                options={userInfo?.skillOfCompany.map((skill) => ({
                  value: skill,
                  label: skill,
                }))}
              />
              {/* {(skills.length === 0) && <spa className="text-xs text-red-500 mt-0.5">Vui lòng chọn kỹ năng cho công việc</spa>} */}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">Hợp đồng</p>
              <Select
                placeholder="Tất cả hợp đồng"
                mode="multiple"
                tagRender={tagRender}
                maxTagCount="responsive"
                value={contract}
                onChange={(newVal) => {
                  setContract(newVal);
                }}
                style={{
                  width: "100%",
                  height: "43px",
                  marginLeft: "10px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                }}
                options={contracts?.map((contract) => ({
                  value: contract.value,
                  label: contract.label,
                }))}
              />
            </div>
          </div>
          {/* typejob and level */}
          <div className="flex-center my-3 gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">
                Loại công việc
              </p>
              <Select
                placeholder="Tất cả loại công việc"
                mode="multiple"
                tagRender={tagRender}
                value={typejob}
                maxTagCount="responsive"
                onChange={(newVal) => {
                  setTypeJob(newVal);
                }}
                style={{
                  width: "100%",
                  height: "43px",
                  marginLeft: "10px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                }}
                options={typeJobs?.map((typejob) => ({
                  value: typejob.value,
                  label: typejob.label,
                }))}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="text-base font-medium text-gray-500">Cấp bậc</p>
              <Select
                placeholder="Tất cả các bậc"
                mode="multiple"
                tagRender={tagRender}
                value={level}
                maxTagCount="responsive"
                onChange={(newVal) => {
                  setLevel(newVal);
                }}
                style={{
                  width: "100%",
                  height: "43px",
                  marginLeft: "10px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                }}
                options={levelList?.map((items) => ({
                  value: items.value,
                  label: items.label,
                }))}
              />
            </div>
          </div>
        </div>
        <div className="my-3 gap-3 w-full ">
          <div className="flex flex-col gap-3 w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg">
            <div className="flex-between gap-3">
              <label className="text-base font-medium text-gray-500 ">
                Các phúc lợi
              </label>
              <button
                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                        active:translate-y-1"
                onClick={(e) => {
                  handleBenefitClick(e);
                }}
              >
                Thêm
                <IoMdAdd className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col my-3 gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {benefit?.map((item, idx) => (
                <div className="flex-center" key={idx}>
                  <p className="text-xl font-medium text-gray-500">
                    {idx + 1}.
                  </p>
                  <InputControl
                    placeholder={`Dòng ${idx + 1}`}
                    value={item}
                    type="text"
                    styles=" !focus:outline-none !rounded-md"
                    onChange={(e) => handleBenefitUpdate(e, idx)}
                  />
                  <button
                    className="p-1 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleBenefitDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-7 h-7" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg">
            <div className="flex-between gap-3">
              <label className="text-base font-medium text-gray-500 ">
                Các yêu cầu
              </label>
              <button
                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                        active:translate-y-1"
                onClick={(e) => {
                  handleRequestClick(e);
                }}
              >
                Thêm
                <IoMdAdd className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col my-3 gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {request?.map((item, idx) => (
                <div className="flex-center " key={idx}>
                  <p className="text-xl font-medium text-gray-500">
                    {idx + 1}.
                  </p>
                  <InputControl
                    placeholder={`Dòng ${idx + 1}`}
                    value={item}
                    type="text"
                    styles=" !focus:outline-none !rounded-md"
                    onChange={(e) => {
                      handleRequestUpdate(e, idx);
                    }}
                  />
                  <button
                    className="p-1 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleRequestDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-7 h-7" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-3 gap-3 w-full border-b-gray-300 border-b-2 border-solid">
          <div className="flex flex-col gap-3 w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg ">
            <div className="flex-between gap-3">
              <label className="text-base font-medium text-gray-500 ">
                Địa chỉ
              </label>
              <button
                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                        active:translate-y-1"
                onClick={(e) => {
                  handleLocationsClick(e);
                }}
              >
                Thêm
                <IoMdAdd className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col my-3 gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {locations?.map((item, idx) => (
                <div className="flex-center " key={idx}>
                  <p className="text-xl font-medium text-gray-500">
                    {idx + 1}.
                  </p>
                  <InputControl
                    placeholder={`Dòng ${idx + 1}`}
                    value={item}
                    type="text"
                    styles=" !focus:outline-none !rounded-md"
                    onChange={(e) => {
                      handleLocationsUpdate(e, idx);
                    }}
                  />
                  <button
                    className="p-1 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleLocationsDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-7 h-7" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full my-5 bg-white rounded-lg py-3 px-6 shadow-lg">
            <div className="flex-between gap-3">
              <label className="text-base font-medium text-gray-500 ">
                Quy trình phỏng vấn
              </label>
              <button
                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                        active:translate-y-1"
                onClick={(e) => {
                  handleInterviewProcessClick(e);
                }}
              >
                Thêm
                <IoMdAdd className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col my-3 gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {interviewProcess?.map((item, idx) => (
                <div className="flex-center " key={idx}>
                  <p className="text-xl font-medium text-gray-500">
                    {idx + 1}.
                  </p>
                  <InputControl
                    placeholder={`Vòng ${idx + 1}`}
                    value={item}
                    type="text"
                    styles=" !focus:outline-none !rounded-md"
                    onChange={(e) => {
                      handleInterviewProcessUpdate(e, idx);
                    }}
                  />
                  <button
                    className="p-1 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleInterviewProcessDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-7 h-7" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex my-3 gap-3 w-full ${
            deadlineSubmit ? "bg-indigo-200" : "bg-red-200"
          }   py-2 px-4`}
        >
          <div className="flex flex-col gap-3 w-1/2">
            <p className="text-base font-medium text-gray-500">Hạn nộp</p>
            <InputControl
              type="date"
              name="deadlineSubmit"
              value={deadlineSubmit}
              onChange={(e) => {
                setDeadlineSubmit(e.target.value);
              }}
              styles=" !focus:outline-none !rounded-md"
              // {...register("deadlineSubmit",{
              //   required: "Vui lòng chọn hạn nộp cuối cùng"
              // })}
              // error={errors.deadlineSubmit ? errors.deadlineSubmit.message : ""}
            />
          </div>
        </div>
      </form>
    </Drawer>
  );
});
FormJobUpdate.displayName = "FormJobUpdate";

export default FormJobUpdate;
