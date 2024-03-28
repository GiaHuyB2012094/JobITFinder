import { useNavigate } from "react-router-dom"

const CardBot = ({ id, imgI, name, address }) => {
    const navigation = useNavigate()

    const handleOnClick = (id, name) => {
        navigation(`/company-item/${id}/${name}`)
    }
  return (
    <div className='w-full rounded border p-3 shadow min-h-16 my-auto hover:bg-indigo-50 cursor-pointer'
        onClick={() => handleOnClick(id, name)}
    >
        <div className='flex gap-2 items-center'>
            <div className='w-1/4'>
                <img src={imgI} alt={`${imgI}-k`} className='w-12'/>
            </div>
            <div className='w-3/4'>
                <p className='text-sm text-indigo-500 font-medium line-clamp-1'>{name}</p>
                <p className='text-sm text-gray-600 line-clamp-1'>{address}</p>

                {}
            </div>
        </div>
    </div>
  )
}

export default CardBot
