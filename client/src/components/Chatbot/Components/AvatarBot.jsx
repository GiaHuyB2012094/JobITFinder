
const AvatarBot = (props) => {
    return (
      <main className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center mx-2">
          <img src={props?.avatar}
              alt="avatar"
              className="w-[35px] h-[35px] rounded-full "
          />
      </main>
    )
  }
  
  export default AvatarBot
  