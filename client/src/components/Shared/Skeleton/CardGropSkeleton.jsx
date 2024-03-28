const CardGroupSkeleton = () => {
  return (
    <main className="animate-pulse border-2 border-solid border-slate-400 shadow-md w-full min-h-96 mx-auto space-y-3">
        <div className="w-full border-b-2 border-solid border-slate-400 p-4">
            <div className="h-2 w-2/3 bg-slate-400 rounded"></div>
        </div>
        
        <div className="space-y-3 px-4 pb-4">
            {
                Array.from({ length: 3}).map((item, idx) => (
                    <div    
                        key={idx} 
                        className="flex space-x-3"
                    >
                        <div className="rounded-md bg-slate-400 h-24 w-1/3"></div>
            
                        <div className="flex-1 space-y-5 py-1 w-2/3">
                            <div className="h-2 w-full bg-slate-400 rounded"></div>
                            <div className="h-2 w-2/5 bg-slate-400 rounded"></div>
            
                            <div className="grid grid-cols-4 gap-4 w-full">
                                <div className="h-2 bg-slate-400 rounded"></div>
                                <div className="h-2 bg-slate-400 rounded"></div>
                                <div className="h-2 bg-slate-400 rounded"></div>
                                <div className="h-2 bg-slate-400 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))  
            }
            
        </div>
    </main>
  )
}

export default CardGroupSkeleton
