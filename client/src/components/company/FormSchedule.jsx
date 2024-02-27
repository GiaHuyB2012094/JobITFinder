import { Button, Select } from "antd"
import Image from "../Image"
import InputControl from "../InputControl"
import { useForm } from "react-hook-form"
import { interviewFormat } from "../../constants"
import { useState } from "react"
//  material ui
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//  dayjs
import dayjs from "dayjs"
import { useScheduleApplyMutation } from "../../slices/applyApiSlice"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const FormSchedule = ({modalClose, idApply}) => {
    var now = dayjs()
    const [ interview, setInterview ] = useState(null)
    const [ intro, setIntro ] = useState("")
    const [ prepare, setPrepare ] = useState("")
    const [ interviewTime, setInterviewTime ] = useState(now)
    const {
        register,
        handleSubmit,
        // reset,
        formState: {
            errors,
        }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            // name: userInfo?.lastName.concat(" ",userInfo?.firstName) || "",
            // email: userInfo?.email || "",
            // phone: userInfo?.phone || "",
        }
    })
    const [ scheduleApply ] = useScheduleApplyMutation();

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value) => {
        console.log('onOk: ', value);
    };
    const onSubmit = async(data) => {
        if (!data.phone) {
            toast.error("Vui lòng nhập số điện thoại của bên tuyển dụng");
            return;
        }
        Object.assign(data,{
            interview,
            intro,
            prepare,
            interviewTime,
        })
        try {
            await scheduleApply({data, id: idApply}).unwrap();
            Swal.fire({
                title: "Tạo lịch hẹn với ứng viên thành công",
                text: "Thành công",
                icon: "success"
              });
            modalClose(false);
        } catch (error) {
            Swal.fire({
                title: "Tạo lịch hẹn với ứng viên thất bại",
                text: "Thất bại",
                icon: "error"
              });
        }
    }
    // console.log(interviewTime.format('H:mm DD/MM/YYYY'))
  return (
    <div className="">
        <main className="w-full flex-center min-h-96  gap-3">
            <div className="w-1/2 flex-center flex-col">
                <Image
                    src="./src/assets/3899259.jpg"
                    alt="img-poster-apply"
                    className="w-full h-full"
                />
            </div>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="h-[450px] overflow-y-scroll  px-3 border-l-2 border-dashed border-gray-200 pl-5"
            >
                <div className="my-2 flex flex-col gap-2">
                    <InputControl
                        name="name"
                        type="text"
                        placeholder="Nhập họ và tên Người gửi. Vd: Nguyễn Gia Huy"
                        label="Họ và tên người gửi"
                        force
                        styles="w-80"
                        {
                            ...register("name",{
                                required: "Vui lòng nhập đầy đủ tên của bạn (^_^)"
                            })
                        }
                        error={errors.name ? errors.name.message : ""}
                    />
                    {/* email */}
                    <InputControl
                        name="email"
                        type="email"
                        styles="w-80"
                        force
                        placeholder="Nhập email của bạn. Vd: Huy123123@gmail.com"
                        label="Email"
                        {
                            ...register("email",{
                                required: "Vui lòng nhập đầy đủ email của bạn (^_^)"
                            })
                        }
                        error={errors.email ? errors.email.message : ""}
                    />
                    {/* phone */}
                    <InputControl
                        name="phone"
                        type="text"
                        styles="w-80"
                        force
                        placeholder="Nhập số điện thoại của bạn. Vd: 0123123123"
                        label="Số điện thoại"
                        {
                            ...register("phone",{
                                required: "Vui lòng nhập đầy đủ số điện thoại của bạn (^_^)",
                                valueAsNumber: true,
                            })
                        }
                        error={errors.phone ? errors.phone.message : ""}
                    />
                    {/* interview format */}
                    <div className="flex flex-col gap-1 w-full px-2">
                        <p className="text-base font-medium text-gray-600">Hình thức <span className="text-red-500 font-medium">*</span></p>
                        <Select
                            placeholder="Chọn hình thức phỏng vấn"
                            style={{ width: '100%', height: "44px",   border: "1px solid gray", borderRadius: "6px", }}
                            allowClear
                            value={interview}
                            onChange={(val) => setInterview(val)}
                            options={interviewFormat?.map((item) => ({value: item.value, label: item.label}))}
                        />
                    </div>
                    <div className="">
                        <p className="text-base font-medium text-gray-600">Thời gian phỏng vấn <span className="text-red-500 font-medium">*</span></p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker 
                                label=""
                                value={interviewTime}
                                onChange={(newValue) => setInterviewTime(newValue)}
                                required
                                autoOk
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-700 font-medium pl-2">Giới thiệu (nếu có)</p>
                        <textarea
                            rows={5}
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            cols={8}
                            placeholder="Giới thiệu đôi nét về công ty"
                            className="rounded-md border-2 border-solid border-gray-400 px-3 py-2 mt-2 mx-2 outline-none"
                        >
                        </textarea>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-700 font-medium pl-2">Chuẩn bị (nếu có)</p>
                        <textarea
                            rows={5}
                            value={prepare}
                            onChange={(e) => setPrepare(e.target.value)}
                            cols={8}
                            placeholder="Ứng viên cần chuẩn bị những gì"
                            className="rounded-md border-2 border-solid border-gray-400 px-3 py-2 mt-2 mx-2 outline-none"
                        >
                        </textarea>
                    </div>
                </div>
            </form>
        </main>
        <div className="flex items-center justify-end gap-4 border-b-2 border-solid border-orange-200 pb-5">
            {/* <Button type="primary">Primary Button</Button> */}
            <Button
                className="border-2 border-solid border-red-500 h-10 w-32 rounded-md text-red-500 font-medium"
                onClick={() => modalClose(false)}
            >   
                Hủy bỏ
            </Button>
            <Button
                className="text-white font-medium bg-orange-500 h-10 w-32 rounded-md border-none active:translate-y-5"
                onClick={handleSubmit(onSubmit)}
            >
                Đặt lịch
            </Button>   
        </div>
    </div>
  )
}
// 3899259.jpg
export default FormSchedule
