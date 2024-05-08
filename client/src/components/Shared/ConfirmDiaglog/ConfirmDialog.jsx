import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
const ConfirmDialog = ({ deleteConfirm, open, setOpen }) => {
  return (
    <div
      onClick={() => setOpen(false)}
      className={`z-10 fixed inset-0 flex justify-center items-center shadow transition-colors ${
        open ? "visible bg-black-20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white border rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 text-xl"
          onClick={() => setOpen(false)}
        >
          <IoCloseSharp />
        </button>

        {/* body */}
        <div className="text-center w-56">
          <RiDeleteBin6Line size={56} className="mx-auto " />
          <div className="mx-auto my-4 w-60">
            <h3 className="text-lg font-black text-gray-800">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500">
              Bạn có chắc bạn muốn xóa không ?
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className="flex-center gap-2 py-2 px-4 font-semibold shadow-md rounded-lg bg-red-600 shadow-red-400/40 text-white w-full"
              onClick={() => deleteConfirm(true)}
            >
              Xóa
            </button>
            <button
              className="flex-center gap-2 py-2 px-4 font-semibold shadow-md rounded-lg  bg-white text-gray-500 w-full"
              onClick={() => setOpen(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
