import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from "../../Layout/HomeLayout"
import { deleteCourseLectures, getCourseLectures } from "../../Redux/Slices/LectureSlice";



function Displaylectures() {

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state =useLocation();
    const {lectures} = useSelector((state) => state.lecture);
    const {role} = useSelector((state) => state.auth);

    const [currentVideo , setCurrentVideo] = useState(0)

    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteCourseLectures({courseId:courseId,lectureId:lectureId}))
        await dispatch(getCourseLectures(courseId))
    }

    
    useEffect(()=>{
        if(!state) navigate("/courses");
            dispatch(getCourseLectures(state.id))
    },[])

 return(
    <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5">
            <div className="text-center text-2xl font semibold text-yellow-500">
                Course Name : {state?.title}
            </div>
            { (lectures && lectures.length > 0) ?
             (<div className="flex  justify-center gap-10 w-full">
                {/* left side for the video and displaying course details  to admin*/} 
                <div className="space-y-5 w-[20rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                    <video src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                    className="object-fill rounded-tl-lg rounded-tr-lg w-full "
                    controls
                    disablePictureInPicture
                    muted
                    controlsList="nodownload"
                    >

                </video> 
                <div>
                    <h1>
                        <span className="text-yellow-500"> Title:{""}
                            {lectures && lectures[currentVideo]?.title}
                        </span>
                        <p>
                            <span className="text-yellow-500 line-clamp-4">
                                Description:{""}
                            </span>
                            {lectures && lectures[currentVideo]?.description}
                        </p>
                    </h1>
                </div>
                </div>
                {/* right section for displaying list of lectures */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-5">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-center">
                            <p>lectures list</p>
                            {role ==="ADMIN" && (
                                <button onClick={()=> navigate("/course/addlecture",{state:{...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                    Add New Lecture
                                </button>
                            )}
                        </li>
                        {lectures && lectures.map((lecture,idx) =>{
                            return (
                                <li className="space-y-2" key={lecture._id}>
                                    <p className="course-pointer" onClick={() => setCurrentVideo(idx)}>
                                        <span>
                                            {""} lecture {idx+1} :{""}
                                        </span>
                                        {lecture?.title}
                                    </p>
                                    {role === "ADMIN" && (
                                        <button onClick={()=>onLectureDelete(state?._id,lecture?._id)} className="btn-danget px-2 py-1 rounded-md font-semibold text-sm">
                                            Delete lecture
                                        </button>
                                    )}
                                </li>
                            )
                        })
                        }
                    </ul>

                 </div>
                 ) :( 
                    role && role ==="ADMIN" && (
                    <button onClick={()=> navigate("/course/addlecture",{state:{...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                        Add New Lecture
                    </button>
                    )
                )}
            </div>
    </HomeLayout>
 )
}

export default Displaylectures