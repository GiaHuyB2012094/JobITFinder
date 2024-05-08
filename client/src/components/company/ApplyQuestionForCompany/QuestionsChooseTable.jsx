import { FaSquarePlus } from "react-icons/fa6";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Checkbox, Divider, Modal } from "antd";
import {
  useAddPostQuestionMutation,
  useDeletePostQuestionMutation,
} from "../../../slices/postApiSlice";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
const CheckboxGroup = Checkbox.Group;

const Card = ({ question, job }) => {
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const [checkedList, setCheckedList] = useState(false);

  const [addPostQuestion] = useAddPostQuestionMutation();

  const questionsList = question.questions;
  const checkAll = questionsList.length === checkedList.length;

  const indeterminate =
    checkedList.length > 0 && checkedList.length < questionsList.length;

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? questionsList : []);
  };

  const handleAddQuestions = async () => {
    const id = job._id;
    const data = Object.assign({}, { questions: checkedList });
    try {
      const result = await addPostQuestion({ id, data }).unwrap();

      toast.success("Thêm thành công");
      setIsShowQuestion(false);
      console.log(result);
    } catch (error) {
      toast.error("Thêm thất bại");
    }
  };

  return (
    <>
      <div className="w-full  flex-between h-12 p-3 border rounded bg-slate-50">
        <p className="font-medium line-clamp-1">{question.name}</p>
        <div className="flex gap-x-3  text-lg">
          <button
            className="cursor-pointer text-orange-500"
            onClick={() => setIsShowQuestion(true)}
          >
            <FaSquarePlus />
          </button>
        </div>
      </div>
      <Modal
        title={
          <p className="text-lg pb-3 border-b text-orange-500">
            Danh sách câu hỏi
          </p>
        }
        centered
        open={isShowQuestion}
        onCancel={() => setIsShowQuestion(false)}
        width={900}
        okType="primary"
        footer={null}
      >
        <div className="">
          <div>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Chọn tất cả
            </Checkbox>

            <div className="my-1 border-b border-indigo-400  w-24 "></div>
            <CheckboxGroup
              options={questionsList}
              value={checkedList}
              onChange={onChange}
            />
          </div>

          <div className="w-60 mt-3 flex gap-x-5">
            <button
              className="flex-center gap-2 py-2 px-4 font-semibold shadow-md rounded-lg bg-indigo-600 shadow-indigo-400/40 text-white w-full"
              onClick={handleAddQuestions}
            >
              Thêm
            </button>
            <button
              className="flex-center gap-2 py-2 px-4 font-semibold shadow-md rounded-lg bg-red-600 shadow-red-400/40 text-white w-full"
              onClick={() => setIsShowQuestion(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const QuestionTag = ({ question, idx, jobID }) => {
  const [deletePostQuestion] = useDeletePostQuestionMutation();

  const handleDeleteQuestion = async () => {
    const data = Object.assign({}, { idx });
    const id = jobID;

    try {
      const result = await deletePostQuestion({ id, data }).unwrap();

      toast.success("Xóa câu hỏi thành công");
    } catch (error) {
      toast.error("Xóa câu hỏi thất bại");
    }
  };
  return (
    <div className=" flex justify-between items-start p-3 border rounded-md">
      <p className="w-96">
        {idx + 1}. {question}
      </p>

      <button
        className="cursor-pointer font-medium text-xl"
        onClick={handleDeleteQuestion}
      >
        <IoCloseSharp />
      </button>
    </div>
  );
};
const QuestionsChooseTable = ({ job }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between gap-x-3 min-h-96 ">
      {/* left */}
      <div className="space-y-2 w-1/2 ">
        <p className=" font-semibold">Bộ câu hỏi</p>
        <div className="max-h-[500px] overflow-y-scroll no-scrollbar space-y-3">
          {userInfo?.setOfQuestions?.length > 0 &&
            userInfo?.setOfQuestions.map((question, idx) => (
              <Card key={idx} question={question} job={job} />
            ))}
        </div>
      </div>
      <div className="border-r"></div>
      {/* right */}
      <div className="space-y-2 w-1/2">
        <p className=" font-semibold">Đang sử dụng</p>

        <div className="max-h-[500px] overflow-y-scroll no-scrollbar space-y-3">
          {job?.interviewQuestions.map((question, idx) => (
            <QuestionTag
              key={idx}
              question={question}
              idx={idx}
              jobID={job._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsChooseTable;
