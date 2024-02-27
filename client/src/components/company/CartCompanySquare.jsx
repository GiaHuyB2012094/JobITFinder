import Image from "../Image"

const CartCompanySquare = (props) => {
    const {
        name,
        avatar,
        coverImg,
        key,
        industry,
        address,
        nationality,
    } = props
  return (
    <div key={key} className="flex-center flex-col cursor-pointer w-[370px] h-[400px] gap-x-5 bg-white rounded-sm shadow-md overflow-hidden
            ">  
        <div className="w-full flex-center flex-col relative">
            <Image
                src={coverImg}
                alt="SignInImage"
                className="w-full h-[247px]"
            />
            <div className="absolute w-full flex-between top-[207px] px-5 py-1">
                <Image
                    src={avatar}
                    alt="SignInImage"
                    className="w-[110px] h-[70px] bg-white shadow-md border-2 border-solid border-gray-200"
                />
            </div>
        </div>
        <div className="w-[210px] ml-32 py-1 ">
            <p className="text-xl font-normal text-gray-700  truncate">{name}</p>
        </div>
        <div className="w-full h-full px-5 gap-1 flex flex-col">

            <div className="">
                <p className="my-1">{address}</p>
                <p className="my-1 text-base font-medium text-indigo-500 capitalize">{nationality}</p>
                {/* <p className="my-1">{quantityOfEmployee}</p> */}
            </div>
            <div className="flex my-1 gap-3">
                {
                    industry?.slice(0,3)?.map((industry,idx) => (
                        <div 
                        className="text-base font-medium text-gray-500 capitalize"
                        key={idx}
                        >
                        {industry}
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CartCompanySquare
