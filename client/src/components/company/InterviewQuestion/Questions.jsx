import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { convertDateFormat } from "../../../constants/convertData";
import { Collapse, Modal } from "antd";
import { useEffect, useState } from "react";
import InputControl from "../../InputControl";
import dayjs from "dayjs";
import { MdAdd } from "react-icons/md";
import {
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} from "../../../slices/usersApiSlice";
import { setCredentials } from "../../../slices/authSlice";
import { toast } from "react-toastify";
import ConfirmDialog from "../../Shared/ConfirmDiaglog/ConfirmDialog";
import EmptyData from "../../../assets/Empty.png";

const UpdateForm = ({ questionUpdate }) => {
  const [question, setQuestion] = useState(questionUpdate.questions || [""]);
  const [name, setName] = useState(questionUpdate.name || "");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateQuestion] = useUpdateQuestionMutation();
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
    const data = Object.assign(
      {},
      { id: questionUpdate.id, name, questions: question, date: now }
    );
    const id = userInfo._id;
    try {
      const result = await updateQuestion({ id, data }).unwrap();
      dispatch(setCredentials({ ...result, position: userInfo?.position }));
      toast.success("Cập nhật bộ câu hỏi thành công");
    } catch (error) {
      toast.error("Cập nhật bộ câu hỏi thất bại");
      console.log(error);
    }
  };

  return (
    <div className=" space-y-3">
      <div className="px-2 bg-slate-50  pb-4 pt-2  shadow w-full">
        <InputControl
          label="Vị trí / kỹ năng"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập Vị trí / kỹ năng"
          styles="!ml-2 !w-[96%]"
        />
      </div>

      <div className="w-full  bg-slate-50 p-3 mt-2 shadow  h-[450px]">
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
            className="flex items-center p-2 bg-green-500 text-white rounded-md  outline-none font-medium text-base
                    active:translate-y-1"
            onClick={() => {
              handleSubmit();
            }}
          >
            Cập nhật bộ câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({ question }) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [deleteQuestion] = useDeleteQuestionMutation();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    async function deleteQuestionFunc() {
      if (deleteConfirm) {
        setIsOpenDelete(false);
        setDeleteConfirm(false);

        let data = Object.assign({}, { id: question.id });

        try {
          const id = userInfo._id;
          const result = await deleteQuestion({ id, data }).unwrap();

          dispatch(setCredentials({ ...result, position: userInfo?.position }));

          toast.success("Xóa bộ câu hỏi thành công");
        } catch (error) {
          toast.error("Xóa  bộ câu hỏi thất bại");
          console.log(error);
        }
      }
    }
    deleteQuestionFunc();
  }, [deleteConfirm]);

  // const handleUpdate = () => {};

  return (
    <>
      <div className="w-full flex justify-between items-end n p-2  min-h-14 bg-white shadow">
        <div className="w-5/6 space-y-1">
          <p className="text-slate-500 text-sm">
            {convertDateFormat(question.date)}
          </p>
          <Collapse
            items={[
              {
                key: question.name,
                label: (
                  <p className="font-medium line-clamp-1">{question.name}</p>
                ),
                children: (
                  <ul className="ml-2 space-y-3">
                    {question.questions.map((question, idx) => (
                      <li className="text-slate-600 list-decimal" key={idx}>
                        {question}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
            ghost
            size="small"
          />
        </div>
        <div className="font-medium flex h-full text-xl gap-x-2">
          <p
            className="text-indigo-500 cursor-pointer"
            onClick={() => setIsOpenUpdate(true)}
          >
            <FaEdit />
          </p>
          <p
            className="text-red-500 text-xl cursor-pointer "
            onClick={() => setIsOpenDelete(true)}
          >
            <MdOutlineDelete />
          </p>
        </div>
      </div>

      <Modal
        title={
          <p className="text-lg pb-3 border-b-2 border-dashed mb-6 border-indigo-200 text-orange-500">
            Cập nhật câu hỏi phỏng vấn
          </p>
        }
        centered
        open={isOpenUpdate}
        onCancel={() => setIsOpenUpdate(false)}
        width={500}
        okType="primary"
        footer={null}
      >
        <div className="">
          <UpdateForm questionUpdate={question} />
        </div>
      </Modal>

      <ConfirmDialog
        open={isOpenDelete}
        setOpen={(data) => setIsOpenDelete(data)}
        deleteConfirm={(data) => setDeleteConfirm(data)}
      />
    </>
  );
};

const Questions = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const questions = userInfo.setOfQuestions;

  return (
    <div className="w-full p-2 bg-slate-50 h-[550px] shadow overflow-y-scroll no-scrollbar">
      <p className="font-medium">Bộ các câu hỏi</p>

      <div className="space-y-4 py-2">
        {questions?.length > 0 ? (
          questions?.map((question, idx) => (
            <Card key={idx} question={question} />
          ))
        ) : (
          <div className="w-full flex-center">
            <img
              src="src/assets/Empty.png"
              alt="empty-data"
              className="w-96 h-96"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
