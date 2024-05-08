import { useId, useState } from "react";
import InputControl from "../../InputControl";
import { MdAdd } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useCreateQuestionsMutation } from "../../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../../slices/authSlice";
import dayjs from "dayjs";

const QuestionAdd = () => {
  const [question, setQuestion] = useState([""]);
  const [name, setName] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [createQuestions] = useCreateQuestionsMutation();
  const dispatch = useDispatch();

  const handleQuestionChange = (e, idx) => {
    e.preventDefault();

    const val = [...question];
    val[idx] = e.target.value;
    setQuestion(val);
  };

  const handleQuestionClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setQuestion((prev) => [...prev, ""]);
  };

  const handleQuestionDelete = (e, idx) => {
    e.preventDefault();

    if (question.length > 1) {
      let delQuestion = [...question];
      delQuestion.splice(idx, 1);
      setQuestion(delQuestion);
    }
  };

  const handleSubmit = async () => {
    const now = dayjs();
    const data = Object.assign({}, { name, questions: question, date: now });

    const id = userInfo._id;
    const checkEmptyQuestions = question.every((q) => q.trim() !== "");

    if (!name) {
      toast.error("Vui lòng nhập tiêu đề câu hỏi");
    } else if (!checkEmptyQuestions) {
      toast.error("Vui lòng nhập nội dung các câu hỏi");
    } else {
      try {
        const result = await createQuestions({ id, data }).unwrap();

        dispatch(setCredentials({ ...result, position: userInfo?.position }));

        toast.success("Thêm bộ câu hỏi thành công");

        console.log(result);
        setName("");
        setQuestion([""]);
      } catch (error) {
        toast.error("Thêm bộ câu hỏi thất bại");
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-slate-50 shadow ">
      <div className="px-2 pb-4 pt-2  border-b w-96">
        <InputControl
          label="Vị trí / kỹ năng"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập Vị trí / kỹ năng"
          styles="!ml-2 !w-80"
        />
      </div>

      <div className="w-96 p-3 mt-2  h-[450px]">
        <div className="flex-between pb-3">
          <label className="text-md  font-medium flex gap-x-2">
            Câu hỏi
            <p className="mx-2 w-6 text-center h-6 rounded-full bg-orange-300 text-white">
              {question.length}
            </p>
          </label>

          <button
            className="flex items-center py-1 px-2 bg-orange-400 text-white rounded-md  outline-none font-medium text-base
                        active:translate-y-1"
            onClick={(e) => {
              handleQuestionClick(e);
            }}
          >
            <MdAdd className="w-5 h-5" />
            Thêm
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar max-h-[335px]">
          {question?.map((item, idx) => (
            <div className="flex-center " key={idx}>
              {/* <p>Câu {idx + 1} : </p> */}
              <InputControl
                placeholder={`Câu hỏi ${idx + 1}`}
                value={item}
                type="text"
                styles=" !focus:outline-none !rounded-md"
                onChange={(e) => {
                  handleQuestionChange(e, idx);
                }}
              />
              <button
                className="p-2 bg-red-500  mt-1 border rounded-md text-white outline-none font-medium  w
                            active:translate-y-1 "
                onClick={(e) => {
                  handleQuestionDelete(e, idx);
                }}
              >
                <MdOutlineDelete className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 ">
          <button
            className="flex items-center p-2 bg-indigo-500 text-white rounded-md  outline-none font-medium text-base
                        active:translate-y-1"
            onClick={() => {
              handleSubmit();
            }}
          >
            Tạo bộ câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAdd;
