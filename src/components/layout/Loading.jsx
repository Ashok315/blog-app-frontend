import "./Loading.css"

export const Loading=({show=true})=>{

    return show && (
        <div className="fixed inset-0 backdrop-brightness-[0.3] overflow-hidden h-full overflow-y-hidden z-[80]">
                <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-center w-[15rem] h-[10rem] max-w-xs rounded-md ">
                    <span className="loader"></span>
                    <p className="mt-4 text-md dark:text-black">Loading...</p>
                </div>
        </div>
            
         )
}
