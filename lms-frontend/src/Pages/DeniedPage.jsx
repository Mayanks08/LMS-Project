import { useNavigate } from "react-router-dom";


export default function DeniedPage() {
    const navigate = useNavigate()
  return (
    <main className='flex flex-col h-screen w-full  justify-center items-center bg-[#1A2238]'>
        <h3 className='text-9xl font-extrabold text-white tracking-widest'>403</h3>
        <div className='text-xl font-bold text-white bg-black rounded rotate-12 absolute '>Access Denied</div>
       <button
       className="bg-[#3a4256] hover:bg-[#143dae] mt-6 p-4 rounded-xl"  
       onClick={() => navigate(-1)}
       >Go Back</button>
    </main>
  )
}
