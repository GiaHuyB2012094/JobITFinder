import Image from "./Image"
import imgSignIn from "../assets/signin.jpg"
import { suggestTags } from "../constants"

const CartGroup = (props) => {
  return (
    <main className="border-2 border-solid border-indigo-300 w-[380px]">
        <div className="w-full bg-indigo-100 p-2 border-b-2 border-indigo-300 border-solid">
            <p>Việc làm nổi bật</p>
        </div>
        <div className="flex-center border-t-2 border-gray-200 border-solid cursor-pointer w-full h-[130px] gap-x-5 p-3 bg-white shadow-md">
            <div className="w-1/5 h-full">
                <Image
                    src={imgSignIn}
                    alt="SignInImage"
                    className="w-full"
                />
            </div>
            <div className="w-4/5 h-full">
                <p className="text-xl font-medium text-indigo-500">Luxoft Vietnam Company Ltd.</p>
                <div className="">
                    <p className="">Quận Tân Bình, Hồ Chí Minh</p>
                </div>
                <div className="flex">
                    {
                        suggestTags.slice(6).map((tag,idx) => (
                            <div 
                            className="py-1 my-2 px-4 mx-1 cursor-pointer font-medium text-xs rounded-full bg-indigo-200 shadow-sm"
                            key={idx}
                            >
                            {tag}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <div className="flex-center border-t-2 border-gray-200 border-solid cursor-pointer w-full h-[130px] gap-x-5 p-3 bg-white shadow-md">
            <div className="w-1/5 h-full">
                <Image
                    src={imgSignIn}
                    alt="SignInImage"
                    className="w-full"
                />
            </div>
            <div className="w-4/5 h-full">
                <p className="text-xl font-medium text-indigo-500">Luxoft Vietnam Company Ltd.</p>
                <div className="">
                    <p className="">Quận Tân Bình, Hồ Chí Minh</p>
                </div>
                <div className="flex">
                    {
                        suggestTags.slice(6).map((tag,idx) => (
                            <div 
                            className="py-1 my-2 px-4 mx-1 cursor-pointer font-medium text-xs rounded-full bg-indigo-200 shadow-sm"
                            key={idx}
                            >
                            {tag}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <div className="flex-center border-t-2 border-gray-200 border-solid cursor-pointer w-full h-[130px] gap-x-5 p-3 bg-white shadow-md">
            <div className="w-1/5 h-full">
                <Image
                    src={imgSignIn}
                    alt="SignInImage"
                    className="w-full"
                />
            </div>
            <div className="w-4/5 h-full">
                <p className="text-xl font-medium text-indigo-500">Luxoft Vietnam Company Ltd.</p>
                <div className="">
                    <p className="">Quận Tân Bình, Hồ Chí Minh</p>
                </div>
                <div className="flex">
                    {
                        suggestTags.slice(6).map((tag,idx) => (
                            <div 
                            className="py-1 my-2 px-4 mx-1 cursor-pointer font-medium text-xs rounded-full bg-indigo-200 shadow-sm"
                            key={idx}
                            >
                            {tag}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </main>
  )
}

export default CartGroup
