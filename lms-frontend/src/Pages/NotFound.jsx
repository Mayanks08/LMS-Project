import { useNavigate } from "react-router-dom"


export default function NotFound() {
    const navigate = useNavigate();

  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center rounded-2xl bg-[#1A2238]" >
        <h1 className="text-9xl text-white font-extrabold tracking-widest">
            404
        </h1>
        <div className="bg-black text-white px-2 rouded rotate-12 absolute">
            Page Not Found
        </div>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A30] group active:text-yellow- focus: outline-none focus:ring">
                <span onClick={()=>navigate(-1)} className="relative block py-3 px-8 transition bg-[#1A2238] border border-current "> Go Back</span>
            </a>
        </button> 
    </div>
  )
}
