import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from "../../Layout/HomeLayout"
import { addCourseLectures } from "../../Redux/Slices/LectureSlice"


function AddLectures() {

  const courseDetails = useLocation().state

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userInput,setUserInput] = useState({
    id:courseDetails?._id,
    lecture: undefined,
    description: "",
    videoSrc: "",
    title:""

  });
    function handleInputchange(e){
      const {name,value} = e.target;
      setUserInput({
        ...userInput,
        [name]:value
      })
    }

    function handleVideo(e){
      const video = e.target.files[0];
      const source =window.URL.createObjectURL(video);
      setUserInput({
        ...userInput,
        videoSrc:source,
        lecture:video 
        })
    }

    async function onFormSubmit(e){
      e.preventDefault();
      if(!userInput.lecture || !userInput.title || !userInput.description || !userInput.videoSrc){
        toast.error("All fields are manadatory")
        return
      }
      const response = await dispatch(addCourseLectures(userInput))
      if(response?.payload?.success){
        navigate(-1),
        setUserInput({
          id:courseDetails?._id,
          lecture: undefined,
          description: "",
          videoSrc: "",
          title:""
      
        })
    }
  }

  useEffect(()=>{
    if(!courseDetails) navigate("/course");
  },[courseDetails,navigate])

  return (
   <HomeLayout>
    <div className="min-h-90 text-white flex-col items-center justify-center gap-10 mx-16">
      <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
        <header className="flex items-center justify-center relative">
          <button className="absolute left-2 text-xl text-green-500"
          onClick={()=>navigate(-1)}>
            <AiOutlineArrowLeft/>
            </button>
          <h1 className="text-xl text-yellow-500 font-semibold ">Add New Lecture</h1>
        </header>
        <form
        onSubmit={onFormSubmit}
        className="flex flex-col gap-5 ">
          <input
          type="text"
          placeholder="Enter Lecture Title"
          name="title"
          onChange={handleInputchange}
          className="bg-transparent -px-3 py-1 border"
          value={userInput.title}
          />
          <textarea
          name="description"
          onChange={handleInputchange}
          className="bg-transparent -px-3 py-1 border resize-none overflow-y-scroll h-24"
          value={userInput.description}
          type="text"
          />
          {userInput.videoSrc?(
            <video
            muted ={true}
            src={userInput.videoSrc}
            controls={true}
            controlsList="nodownload nofullscreen"
            disablePictureInPicture
            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
            >
            </video>
          ):(
            <div className="h-48 border flex items-center justify-center cursor-pointer">
              <label className="font-semibold text-xl cursor-pointer" htmlFor="lecture">Choose Your Video</label>
              <input type="file" className="hidden " id="lecture"   name="lecture" onChange={handleVideo} accept="video/mp video/x-mp4" />
            </div>
          )}
            <button type="submit" className="btn btn-primary py-1 font-semibold">
              Add New lecture    
            </button>
        </form>
      </div>

    </div>

   </HomeLayout>
  )
}

export default AddLectures