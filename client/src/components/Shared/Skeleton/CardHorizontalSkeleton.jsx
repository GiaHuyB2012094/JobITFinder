
const CardHorizontalSkeleton = () => {

  return (
    <div className="border  shadow-md rounded-md p-4 w-full min-h-36 mx-auto">
        <div className="animate-pulse flex space-x-5">
            {/* <div className="rounded-full bg-slate-700 h-full w-1/5"></div> */}
            <div className="rounded-md bg-slate-400 h-36 w-1/5"></div>

            <div className="flex-1 space-y-5 py-1 w-4/5">
                <div className="h-2 w-full bg-slate-400 rounded"></div>
                <div className="h-2 w-52 bg-slate-400 rounded"></div>
                <div className="h-2 w-40 bg-slate-400 rounded"></div>
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 w-3/5">
                      <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                      <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-400 rounded"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardHorizontalSkeleton
