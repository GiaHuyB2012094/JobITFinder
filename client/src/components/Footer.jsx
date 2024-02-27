import Button from "./Button"
import InputControl from "./InputControl"
import { FaFacebook,FaInstagram } from "react-icons/fa6";
import { SiSwift } from "react-icons/si";
import { AiFillGoogleCircle } from "react-icons/ai";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <main className="bg-cover bg-center w-full min-h-screen bg-[url('./src/assets/v904-nunny-011-g.jpg')] flex-center  shadow-xl py-24 px-48">
        <section className="p-10 flex-center flex-col gap-6 h-full shadow-md rounded-md bg-indigo-50 w-full">
          <div className="bg-white w-full min-h-50 p-10 shadow-xl rounded-lg flex flex-col gap-5">
            <div className="flex-center ">
              <p className=" text-3xl font-medium text-indigo-500">JobITFinder</p>
            </div>
            <ul className="flex-center text-base gap-4 font-medium">
                <li className="text-indigo-700">Tìm việc</li>
                <li className="text-indigo-700">Tìm công ty</li>
                <li className="text-indigo-700">Tính lương Gross Net</li>
                <li className="text-indigo-700">Tạo CV</li>
                <li className="text-indigo-700">Ứng tuyển</li>
            </ul>
            <div className="flex-between">
              <div className="flex">
                <InputControl
                  placeholder="Nhập email"
                  type="text"
                  // className="rounded-lg w-[300px]"
                />
                <Button
                  title="Đăng ký"
                  
                  styles="!rounded-lg !w-[130px] !h-[43px] mt-1 !ml-1"
                  // className="!rounded-lg"
                />
              </div>
              <div className="text-indigo-700 text-base">
                <p>Copyright nguyen gia huy 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white w-full min-h-50 p-10 shadow-xl rounded-lg flex flex-col gap-5 text-indigo-700">
            <div className="flex-between">
              <div className="">
                <p className="text-xl font-medium">Tuyển dụng với JobITFinder</p>
                <p className="my-2">Chúng tôi sẽ cung cấp cho bạn những thông tin mới nhất</p>
              </div>
              <div className="flex">
                  <InputControl
                    placeholder="Nhập email"
                    type="text"
                    // className="rounded-lg w-[300px]"
                  />
                  <Button
                    title="Đăng ký"
                    
                    styles="!rounded-lg !w-[130px] !h-[43px] mt-1 !ml-1"
                    // className="!rounded-lg"
                  />
                </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/3">
                <p className="text-xl font-medium">JobITFinder</p>
                <p className="my-2">Lựa chọn công việc phù hợp với kỹ năng của bạn nhất</p>
              </div>
              <div className="w-2/3 flex-center gap-16">
                <ul className="">
                  <li className="font-medium">Địa điểm</li>
                  <li className="">HCM</li>
                  <li className="">Hà nội</li>
                  <li className="">Đà Nẵng</li>
                  <li className="">Cần thơ</li>
                </ul>
                <ul className="">
                  <li className="font-medium">Cấp bậc</li>
                  <li className="">Intern</li>
                  <li className="">Fresh</li>
                  <li className="">Junior</li>
                  <li className="">Senior</li>
                </ul>
                <ul className="">
                  <li className="font-medium">Công việc</li>
                  <li className="">In Office</li>
                  <li className="">Hybrid</li>
                  <li className="">Remote</li>
                  <li className="">Oversea</li>
                </ul>
                <ul className="">
                  <li className="font-medium">Hợp đồng</li>
                  <li className="">Full-time</li>
                  <li className="">Freelancer</li>
                  <li className="">Part-time</li>
                  <li className="">Tất cả</li>
                </ul>

              </div>
            </div>
            <div className="flex-between">
              <div className="text-indigo-700 text-base">
                <p>Copyright nguyen gia huy 2024</p>
              </div>
              <div className="text-indigo-700 text-2xl flex-center gap-10">
                <FaFacebook />
                <FaInstagram />
                <SiSwift />
                <AiFillGoogleCircle />
                <SiZalo />
              </div>
            </div>
          </div>

          <div className="bg-white w-full min-h-50 p-10 shadow-xl rounded-lg flex flex-col gap-5">
            <div className="flex-between">
                <div className="text-indigo-700 ">
                  <p className="text-xl font-medium">JobITFinder</p>
                </div>
                <div className="flex">
                    <InputControl
                      placeholder="Nhập email"
                      type="text"
                    />
                    <Button
                      title="Đăng ký"
                      
                      styles="!rounded-lg !w-[130px] !h-[43px] mt-1 !ml-1"
                    />
                  </div>
              </div>
              <div className="flex items-end justify-end">
                <div className="text-indigo-700 text-base">
                  <p>Copyright nguyen gia huy 2024</p>
                </div>
              </div>
          </div>
      </section>
      {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
    </main>
  )
}

export default Footer
