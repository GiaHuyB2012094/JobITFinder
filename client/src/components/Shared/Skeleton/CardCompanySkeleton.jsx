const CardCompanySkeleton = () => {
  return (
    <main className="animate-pulse shadow w-[370px] h-[400px] mx-auto space-y-5 rounded border">
        <div className="w-full relative">
            <div className="w-full h-60 bg-slate-400 rounded-t "></div>
            <div className="absolute w-28 h-20 top-52 left-6 px-5 py-1 bg-slate-500 z-10"></div>
        </div>
        
        <div className="w-52 ml-36 py-1 h-2 bg-slate-400 rounded"></div>

        <div className="h-full px-5 flex-1 space-y-5 py-4 w-full">
            <div className="h-2 w-full bg-slate-400 rounded"></div>
            <div className="h-2 w-3/5 bg-slate-400 rounded"></div>

            <div className="grid grid-cols-4 gap-4 w-full">
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="h-2 bg-slate-400 rounded"></div>
            </div>
        </div>
    </main>
  )
}

export default CardCompanySkeleton
