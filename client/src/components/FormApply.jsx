import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import InputControl from "./InputControl";
import Image from "./Image";
import { Button, Upload } from "antd";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoCloudUpload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useCreateApplyMutation } from "../slices/applyApiSlice";
import axios from "axios";
// import { Navigate } from "react-router-dom";
const FormApply = ({ companyID, post, modalClose, appliedSuccess }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [intro, setIntro] = useState("");
  const [createApply] = useCreateApplyMutation();
  const [file, setFile] = useState("");
  const [answerInterviewQuestion, setAnswerInterviewQuestion] = useState(
    post?.interviewQuestions.map((question) => ({ name: question, answer: "" }))
  );

  const inputFileRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: userInfo?.lastName.concat(" ", userInfo?.firstName) || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
    },
  });
  const handleClickUploadFile = () => {
    inputFileRef.current.click();
  };

  const handleOnChangeQuestions = (e, idx) => {
    e.preventDefault();

    const valOnChangeQuestions = [...answerInterviewQuestion];
    valOnChangeQuestions[idx].answer = e.target.value;
    setAnswerInterviewQuestion(valOnChangeQuestions);
  };

  const onSubmit = async (data) => {
    // ---------------------------------------------------
    try {
      // upload CV
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      // fetch api 1
      const result = await axios.post(
        "http://localhost:3000/api/apply/upload-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // fetch api 2
      Object.assign(data, {
        cv: result.data,
        intro: intro,
        companyID: companyID,
        post: post,
        userID: userInfo?._id,
        status: "await",
        answerInterviewQuestion,
      });
      console.log(data);
      await createApply(data).unwrap();
      await Swal.fire({
        title: "Ứng tuyển công việc",
        text: "Đã ứng tuyển thành công",
        icon: "success",
      });
      modalClose(false);
      appliedSuccess(true);
    } catch (error) {
      Swal.fire({
        title: "Ứng tuyển thất bại",
        text: "Đã xãy ra sai sót trong quá trình xử lý",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <main className="w-full h-[550px] flex justify-center gap-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full overflow-y-scroll overflow-x-hidden pr-2"
        >
          <div className="my-2 w-full flex flex-col gap-2">
            <div className="flex items-center gap-3 w-full">
              <p className="font-medium text-indigo-400">
                (Nếu bạn chưa có CV, chọn tạo CV ngay) &#10142;
              </p>
              <Button
                className="bg-indigo-500 text-white px-4 h-10 hover:bg-indigo-400"
                onClick={() => navigate("/create-resume")}
              >
                Tạo CV ngay
              </Button>
            </div>
            {/* upload cv */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-700 font-medium pl-2">
                Tải CV <span className="font-bold text-red-500 mx-1">*</span>
              </p>
              <div className="px-2">
                {/* <Upload {...uploadProps}>
                                <Button icon={<MdOutlineFileUpload />}>Click to Upload</Button>
                            </Upload> */}
                <InputControl
                  ref={inputFileRef}
                  type="file"
                  accept="application/pdf"
                  styles="hidden"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && (
                  <p className="py-1 px-2 bg-slate-200 mb-2 cursor-pointer">
                    {file?.name}
                  </p>
                )}
                <Button
                  className="flex-center gap-2 bg-indigo-500 text-white px-4 h-10 w-full"
                  onClick={handleClickUploadFile}
                >
                  <span>
                    <IoCloudUpload />
                  </span>
                  Tải CV
                </Button>
              </div>
            </div>
            <InputControl
              name="name"
              type="text"
              placeholder="Nhập họ và tên. Vd: Nguyễn Gia Huy"
              label="Họ và tên"
              force
              styles="w-96"
              {...register("name", {
                required: "Vui lòng nhập đầy đủ tên của bạn (^_^)",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            {/* email */}
            <InputControl
              name="email"
              type="email"
              styles="w-96"
              force
              placeholder="Nhập email của bạn. Vd: Huy123123@gmail.com"
              label="Email"
              {...register("email", {
                required: "Vui lòng nhập đầy đủ email của bạn (^_^)",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            {/* phone */}
            <InputControl
              name="phone"
              type="text"
              styles="w-96"
              force
              placeholder="Nhập số điện thoại của bạn. Vd: 0123123123"
              label="Số điện thoại"
              {...register("phone", {
                required: "Vui lòng nhập đầy đủ số điện thoại của bạn (^_^)",
                valueAsNumber: true,
              })}
              error={errors.phone ? errors.phone.message : ""}
            />
            {/* intro letter */}
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium pl-2">
                Giới thiệu bản thân
              </p>
              <textarea
                rows={6}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Viết thư giới thiệu ngắn gọn (điểm mạnh, điểm yếu), những mong muốn, lý do ứng tuyển công việc này. Đây là cách ấn tượng tốt nhất với nhà tuyển dụng nếu bạn chưa có kinh nghiệm làm việc thực tế."
                className="rounded-md border-2 border-solid border-gray-400 px-3 py-2 mt-2 mx-2 outline-none"
              ></textarea>
            </div>

            {/* answer */}
            {post?.interviewQuestions.length > 0 && (
              <div className="mt-3 py-3 border-t border-slate-400">
                <p className="text-gray-700 font-medium pl-2 capitalize text-indigo-500 text-lg">
                  Các câu hỏi thêm
                </p>
                {answerInterviewQuestion.map((question, idx) => (
                  <div key={idx} className="w-96">
                    <InputControl
                      type="text"
                      label={question.name}
                      value={question.answer}
                      onChange={(e) => handleOnChangeQuestions(e, idx)}
                      force
                      styles="w-96"
                      // {...register("name", {
                      //   required: "Vui lòng nhập đầy đủ tên của bạn (^_^)",
                      // })}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
        <div className="w-1/2 flex-center flex-col">
          <Image
            src="https://img.freepik.com/free-vector/students-watching-recorded-lecture-with-professor-talking-from-tablet-podcast-courses-audio-video-recording-class-recording-access-concept-vector-isolated-illustration_335657-1983.jpg?size=626&ext=jpg"
            alt="img-poster-apply"
            className=""
          />
        </div>
      </main>
      <div className="flex items-center justify-end gap-4">
        <Button
          className="border-2 border-solid border-red-500 h-10 w-32 rounded-md text-red-500 font-medium"
          onClick={() => modalClose(false)}
        >
          Hủy bỏ
        </Button>
        <Button
          className="text-white bg-indigo-500 h-10 w-32 rounded-md border-none active:translate-y-5"
          onClick={handleSubmit(onSubmit)}
        >
          Ứng tuyển
        </Button>
      </div>
    </div>
  );
};

export default FormApply;
