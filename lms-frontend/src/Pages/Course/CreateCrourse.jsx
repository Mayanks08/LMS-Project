import { useState } from "react";
import toast from "react-hot-toast";
import {  AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux"
import { Form, Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/Courseslice";


export default function CreateCrourse() {
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const [userInput , setUserInput] = useState({
    title:"",
    category:"",
    description:"",
    createdBy:"",
    thumbnail: null,
    previewImage:"",

  })
  
  function handleImageUpload(e) {
    e.preventDefault()
    const  uploadedImage = e.target.files[0]
    if(uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load",function(){
        setUserInput({
          ...userInput,
          thumbnail: uploadedImage,
          previewImage: this.result

        })
      })
     
    }
  }

  function  handleUserInput(e){
      const {name,value} = e.target;
      setUserInput({
        ...userInput ,
        [name]:value
        })
     }
     
  async function onFormSubmit(e){
      e.preventDefault();

      if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy){
          toast.error("Please fill all the fields")
          return;
      }
      
      const response = await dispatch(createNewCourse(userInput));
      if(response?.payload?.success){
        setUserInput({
          title:"",
          category:"",
          description:"",
          createdBy:"",
          thumbnail: null,
          previewImage:"",
      
        })
        navigate("/courses")
      }
      

     }


  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]"> <Form
     onSubmit={onFormSubmit}
     className="justify-center flex flex-col gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
     >
      <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
      <AiOutlineArrowLeft/>
      </Link>
      <h1 className="text-3xl text-center font-bold">Create New Course</h1>

      <main className="grid grid-cols-2 gap-x-10">
        <div className=" gap-y-6">
          <div className="">
            <label htmlFor="image_uploads " className="cursor-pointer">
                  {
                    userInput.previewImage ? (<img
                    className="w-full h-44 m-auto broder"
                    src={userInput.previewImage}
                    alt="Course Image"
                    />):(
                      <div className="w-full h-44 m-auto flex items-center justify-center" >
                        <h1 className="font-bold text">Upload your thumbnail image</h1>
                      </div>
                    )
                  }
            </label>
                      <input className="hidden"
                      type="file"
                      id="image_uploads"
                      accept=".jpg ,.jpeg, .png"
                      name="imageUploads"
                      onChange={handleImageUpload}
            />
          </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Title" className=" text-lg font-semibold">
                      Course Title
                    </label>
                    <input
                    required
                    type="text"
                    id="Title"
                    name="title"
                    placeholder="Enter your course title"
                    className="bg-transparent px-2 py-3 border"
                    value={userInput.title}
                    onChange={handleUserInput}
                    />
                  </div>
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="createdBy" className=" text-lg font-semibold">
                          Mentor-Name 
                        </label>
                        <input
                        required
                        type="text"
                        id="createdBy"
                        name="createdBy"
                        placeholder="Enter your Mentor Name"
                        className="bg-transparent px-2 py-3 border"
                        value={userInput.createdBy}
                        onChange={handleUserInput}
                        />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className=" text-lg font-semibold">
                          course category
                        </label>
                        <input
                        required
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter your course category"
                        className="bg-transparent px-2 py-3 border"
                        value={userInput.category}
                        onChange={handleUserInput}
                        />
                </div>
                <div className="flex flex-col gap-2">
              <label htmlFor="description" className=" text-lg font-semibold">
                          course description
                        </label>
                        <textarea
                        required
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter your course description"
                        className="bg-transparent px-2 py-3 h-24 overflow-y-scroll resize-none border"
                        value={userInput.description}
                        onChange={handleUserInput}
                        />
                </div>
        </div>
      </main>
            <button type="submit" className="w-full py-2 rounded-sm text-large bg-yellow-300 hover:bg-yellow-500 transition-all ease-in-out">
            Create Course
            </button>
     </Form>
     </div>
    
    </HomeLayout>
  )
}
