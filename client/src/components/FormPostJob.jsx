import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Select, Tag } from "antd";
import { contracts, gender, levelList, typeJobs } from "../constants";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Button from "./Button";
import InputControl from "./InputControl";
import ImageUpload from "./resume/ImageUpload";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
// import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";
// api job post
import { useCreateJobPostMutation } from "../slices/postApiSlice";
import { convertData } from "../constants/convertData";
import { useGetSkillsQuery } from "../slices/skillOfCompanyApiSlice";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={"orange"}
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

const FormPostJob = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [isUpload, setIsUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [skills, setSkills] = useState([]);
  const [level, setLevel] = useState([]);
  const [contract, setContract] = useState([]);
  const [genderCandidate, setGenderCandidate] = useState();
  const [typejob, setTypeJob] = useState([]);
  const [benefit, setBenefit] = useState(userInfo?.benefits || [""]);
  const [request, setRequest] = useState([""]);
  const [locations, setLocations] = useState(userInfo?.addressDetail || [""]);
  const [minSalary, setMinSalary] = useState(100000);
  const [maxSalary, setMaxSalary] = useState(100000);
  const [interviewProcess, setInterviewProcess] = useState([""]);
  const [isSubmitSuccessful, setIsSubmitSucessful] = useState(false);
  // const dateNow = new Date();
  const [deadlineSubmit, setDeadlineSubmit] = useState("");

  const { data: dataSkillsOfCompany } = useGetSkillsQuery();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [createJobPost] = useCreateJobPostMutation();

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
      await createJobPost(data).unwrap();
      Swal.fire({
        title: "Đăng bài tuyển dụng",
        text: "Bài tuyển dụng đã được đăng tuyển",
        icon: "success",
      });
      setIsSubmitSucessful(true);
    } catch (error) {
      Swal.fire({
        title: "Đăng bài tuyển dụng",
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

  // function createMarkup(html) {
  //   return {
  //     __html: DOMPurify.sanitize(html)
  //   }
  // }
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        urlApply: "",
        quantity: 0,
        experience: 0,
        email: "",
      });
      setBenefit(userInfo?.benefits || [""]);
      setContract([]);
      setDeadlineSubmit("");
      setGenderCandidate("");
      setLevel([]);
      setImageUrl([]);
      setInterviewProcess([""]);
      setMaxSalary(100000);
      setMinSalary(100000);
      setLocations(userInfo?.addressDetail || [""]);
      setRequest([""]);
      setSkills([]);
      setTypeJob([]);
      setConvertedContent(null);
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <main className="px-14 space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2 w-full">
          <p className="text-base font-medium ">Tải hình ảnh công việc</p>
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

        <div className="space-y-2">
          <p className="text-base font-medium ">Tên công việc</p>
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

        <div className="space-y-2 ml-1 w-full">
          <p className="text-base font-medium  ">Mô tả</p>
          <div className="w-full">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
        </div>

        {/*  */}
        <div className="flex-center gap-x-10 w-full">
          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Link Apply</p>
            <InputControl
              type="text"
              placeholder="Nhập link url để ứng tuyển"
              name="urlApply"
              styles=" !focus:outline-none !rounded-md"
              {...register("urlApply")}
              // error={errors.urlApply ? errors.urlApply.message : ""}
            />
          </div>
        </div>

        {/* quantity and experience */}
        <div className="flex-center gap-x-10 w-full">
          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Số lượng</p>
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

          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Số năm kinh nghiệm</p>
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
        <div className="flex-center gap-x-10 w-full">
          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Email Apply</p>
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

          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Giới tính</p>
            <Select
              placeholder="Chọn giới tính"
              style={{
                width: "100%",
                height: "41px",
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
        <div className="flex-center gap-x-10 w-full">
          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Lương tối thiểu</p>
            <CurrencyInput
              id="minSalary"
              name="minSalary"
              placeholder="Nhập tiền lương tối thiểu"
              defaultValue={100000}
              decimalsLimit={2}
              value={minSalary}
              className={`w-full  border border-gray-400 !focus:outline-none !rounded px-4 py-2 my-1 mx-2`}
              onValueChange={(value) => setMinSalary(parseInt(value))}
              prefix={prefix}
            />
          </div>

          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Lương tối đa</p>
            <CurrencyInput
              id="maxSalary"
              name="maxSalary"
              placeholder="Nhập tiền lương tối đa"
              defaultValue={100000}
              decimalsLimit={2}
              value={maxSalary}
              className={`w-full border border-gray-400 !focus:outline-none !rounded py-2 px-4 my-1 mx-2`}
              onValueChange={(value) => setMaxSalary(parseInt(value))}
              prefix={prefix}
            />
          </div>
        </div>

        {/* skills and contract */}
        <div className="flex-center gap-x-10 w-full">
          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Kỹ năng</p>
            <Select
              placeholder="Chọn kỹ năng công ty"
              mode="multiple"
              tagRender={tagRender}
              onChange={(value) => setSkills(value)}
              style={{
                width: "100%",
                minHeight: "41px",
                marginLeft: "10px",
                border: "1px solid gray",
                borderRadius: "6px",
              }}
              options={userInfo?.skillOfCompany.map((skill) => ({
                value: skill,
                label: convertData(dataSkillsOfCompany, skill),
              }))}
            />
            {/* {(skills.length === 0) && <spa className="text-xs text-red-500 mt-0.5">Vui lòng chọn kỹ năng cho công việc</spa>} */}
          </div>

          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Hợp đồng</p>
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
                minHeight: "41px",
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
        <div className="flex-center gap-x-10 w-full">
          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Loại công việc</p>
            <Select
              bordered="false"
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
                minHeight: "41px",
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

          <div className="space-y-2 w-full">
            <p className="text-base font-medium ">Cấp bậc</p>
            <Select
              allowClear
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
                minHeight: "41px",
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

        <div className="flex gap-3 pb-4 w-full border-b-gray-300 border-b border-solid">
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex-between gap-3">
              <label className="text-base font-medium  ">Các phúc lợi</label>
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
            <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {benefit?.map((item, idx) => (
                <div className="flex-center" key={idx}>
                  <InputControl
                    placeholder={`Dòng ${idx + 1}`}
                    value={item}
                    type="text"
                    styles=" !focus:outline-none !rounded-md"
                    onChange={(e) => handleBenefitUpdate(e, idx)}
                  />
                  <button
                    className="p-2 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleBenefitDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col  gap-3 w-1/2 ">
            <div className="flex-between gap-3">
              <label className="text-base font-medium  ">Các yêu cầu</label>
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
            <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {request?.map((item, idx) => (
                <div className="flex-center " key={idx}>
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
                    className="p-2 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleRequestDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pb-4 w-full border-b-gray-300 border-b border-solid">
          <div className="flex flex-col  gap-3 w-1/2 ">
            <div className="flex-between gap-3">
              <label className="text-base font-medium  ">Địa chỉ</label>
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
            <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {locations?.map((item, idx) => (
                <div className="flex-center " key={idx}>
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
                    className="p-2 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleLocationsDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col  gap-3 w-1/2 ">
            <div className="flex-between gap-3">
              <label className="text-base font-medium  ">
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
            <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar max-h-[400px]">
              {interviewProcess?.map((item, idx) => (
                <div className="flex-center " key={idx}>
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
                    className="p-2 bg-transparent border-solid border-[#C06A47] mt-1 border-2 rounded-md text-[#C06A47] outline-none font-medium 
                            active:translate-y-1 "
                    onClick={(e) => {
                      handleInterviewProcessDelete(e, idx);
                    }}
                  >
                    <MdDelete className="w-6 h-6" />
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
            <p className="text-base font-medium ">Hạn nộp</p>
            <InputControl
              type="date"
              name="deadlineSubmit"
              value={deadlineSubmit}
              onChange={(e) => {
                setDeadlineSubmit(e.target.value);
              }}
              styles=" !focus:outline-none !rounded-md mb-4"
              // {...register("deadlineSubmit",{
              //   required: "Vui lòng chọn hạn nộp cuối cùng"
              // })}
              // error={errors.deadlineSubmit ? errors.deadlineSubmit.message : ""}
            />
          </div>
        </div>
      </form>

      <Button
        title="Lưu và Đăng bài"
        medium
        styles="w-48 !ml-0"
        onClick={handleSubmit(onSubmit)}
      />
    </main>
  );
};

export default FormPostJob;
