const ContentSkeleton = () => {
  return (
    <div className="border shadow-md rounded-md p-4 w-full min-h-36 mx-auto">
        <div className="animate-pulse space-y-4">
            <div className="pb-4 border-b-2 border-slate-300 ">
                <div className="h-2 w-1/5 bg-slate-400 rounded"></div>
            </div>

            <div className="flex-1 space-y-5 pb-1 w-full">
                <div className="h-2 w-full bg-slate-400 rounded"></div>
                <div className="h-2 w-full bg-slate-400 rounded"></div>
                <div className="h-2 w-full bg-slate-400 rounded"></div>
                <div className="h-2 w-full bg-slate-400 rounded"></div>
                <div className="h-2 w-full bg-slate-400 rounded"></div>
            </div>
        </div>
    </div>
  )
}

export default ContentSkeleton
