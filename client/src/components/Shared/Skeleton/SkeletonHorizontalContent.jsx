const SkeletonHorizontalContent = ({ contentNumber }) => {
  return (
<div className="w-full min-h-10 shadow-md border animate-pulse space-y-4 p-4">
        <div className="pb-3 border-b-2 border-slate-300">
            <div className="bg-slate-400 rounded w-3/5 h-2"></div>
        </div>
        
        {Array.from({ length: contentNumber}).map((item, idx) => (
            <div key={idx} className="bg-slate-400 rounded w-full h-2"></div>
        ))}
    </div>
  )
}

export default SkeletonHorizontalContent
