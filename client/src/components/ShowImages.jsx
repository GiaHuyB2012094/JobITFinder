import { useState } from "react"
import Image from "./Image"

const ShowDetail = ({images, imgCurrent, closeShow}) => {
    const [ imgShow, setImgShow ] = useState(imgCurrent || "");

    const handleCloseShow = e => {
        if (e.target === e.currentTarget) {
            closeShow(false);
        }
    }

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex-center flex-col w-screen h-screen bg-gray-300/60 z-[60]">

            <div className="flex justify-between gap-4 w-full  h-[80%] py-6 "
                onClick={e => handleCloseShow(e)}
            >
                <div className="h-full bg-white flex-center mx-auto w-[1000px]">
                    <Image src={imgShow}
                        alt='image-show-detail'
                        className="w-full h-full"
                    />
                </div>
                <div className="flex w-[5%]">
                    <button className="p-3 rounded-md text-black h-8 text-center flex-center font-medium text-3xl hover:text-gray-500"
                        onClick={e => handleCloseShow(e)}
                    >
                        X
                    </button>
                </div>
            </div>

            <div className="w-full h-[20%] flex-center gap-6 bg-gray-400">
                {images?.map((imgItem, idx) => (
                    <div key={idx} className="w-32 h-32 bg-slate-100 shadow-sm hover:opacity-70">
                        <Image src={imgItem}
                            alt={`img-${idx}`}
                            className="w-full h-full cursor-pointer"
                            onClick={() => setImgShow(imgItem)}
                        />
                    </div>
                ))}
                
            </div>
        </div>
    )
}

const ShowImages = (props) => {
    const { images } = props
    const [ isOpenShow, setIsOpenShow ] = useState(false)
    const [ imageCurrent, setImageCurrent ] = useState("")

    const handleOpenShowAllImages = (val) => {
        setImageCurrent(val)
        setIsOpenShow(true)
    }
    return (
    <div className="relative w-full flex flex-between gap-3 flex-wrap">

      {images?.slice(0,3).map((imgItem, idx) => (
        <div key={idx} className="w-[220px] h-[220px] bg-slate-100 shadow-sm">
            {idx === 2 ? (
                <div className="relative w-full h-full cursor-pointer"
                    onClick={() => handleOpenShowAllImages(imgItem)}
                >
                    <Image src={imgItem}
                        alt={`img-${idx}`}
                        className="w-full h-full absolute"
                    />
                    
                    <div className="absolute w-full h-full bg-gray-300/80 flex-center">
                        <p className="text-3xl font-bold text-indigo-500">+{images.length - 3} ảnh</p>
                    </div>
                </div>
            ) : (
                <Image src={imgItem}
                    alt={`img-${idx}`}
                    className="w-full h-full cursor-pointer"
                    onClick={() => handleOpenShowAllImages(imgItem)}
                />
            )}
        </div>
      ))}

      {isOpenShow ? (
        <ShowDetail images={images}
            imgCurrent={imageCurrent}
            closeShow={data => setIsOpenShow(data)}
        />
      ) : ""}
    </div>
  )
}

export default ShowImages
