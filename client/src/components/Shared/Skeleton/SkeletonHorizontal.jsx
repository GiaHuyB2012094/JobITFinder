const SkeletonHorizontal = ({ width, height }) => {
  return (
    <div
      className="rounded bg-slate-300 shadow-md border animate-pulse"
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default SkeletonHorizontal;
