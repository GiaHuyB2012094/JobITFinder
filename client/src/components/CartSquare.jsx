import { BsBack } from "react-icons/bs";
import { convertDateFormat, currencyFormat } from "../constants/convertData";
import { Modal } from "antd";
import { useState } from "react";
const CartSquare = ({icon, name, to, from, skills, salary, color, modals, dataModal}) => {
  const [ open, setOpen ] = useState(false);
  return (
    <main className={`bg-[${color}] p-5 rounded-sm flex flex-col gap-2 w-80 shadow-md shadow-[${color}]`}>
        <div className=" flex-between">
            <p className="text-xl font-medium">{icon || <BsBack/>}</p>
            {modals && 
              <p 
                onClick={() => setOpen(true)}
                className="text-base italic text-indigo-500 cursor-pointer 
                    hover:font-medium hover:text-indigo-700"
                >
                    xem chi tiết
              </p>
            }
        </div>
        <div className="">
            <p className="text-base font-medium h-7 truncate">{name}</p>
            <p className="text-md">{ convertDateFormat(to)} - {convertDateFormat(from)}</p>
        </div>
        <div className="border-t-2 border-solid border-gray-400 my-2"></div>
        <div className="flex gap-3 flex-wrap">
            {skills && 
                skills.map((item, idx) => (
                    <p key={idx} className="text-sm px-2 py-1 rounded-md bg-indigo-300">{item}</p>
                ))}
        </div>
        <div className="flex-between">
            <p className="text-base font-medium text-gray-600">Lương</p>
            <p className="font-medium text-green-500">{currencyFormat(salary)}</p>
        </div>
        {/* modal */}

        <Modal
          title={
            <p className="text-lg pb-3 border-b-2 border-dashed mb-6 border-indigo-200 text-indigo-500">
              Thông tin chi tiết  
            </p>  
          }
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width={1300}
          okType="primary"
          footer={null}
        >
          {dataModal}
      </Modal>

    </main>
  )
}

export default CartSquare
