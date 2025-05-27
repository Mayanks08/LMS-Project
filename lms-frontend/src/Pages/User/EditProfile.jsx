import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/Authslice";


function EditProfile(){
    const disptach = useDispatch()
    const navigate = useNavigate()
    const [data ,setData] = useState({
        previewImage:"",
        fullName:"",
        email:"",   
        avatar:undefined,
        userId:useSelector((state) => state?.auth?.data?._id),

    })

    function handleImageUpload(e){
        e.preventDefault();
        const UploadedImage = e.target.files[0];
        if(UploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(UploadedImage);
            fileReader.addEventListener("load",function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar:UploadedImage
                })
            })
        }

    }

    function handleInputChange(e){
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }
     async function onFormSubmit(e){
        e.preventDefault()
        if(!data.fullName|| !data.avatar){
            toast.error("All fields are required");
            return;
        }
        if(data.fullName.length < 5){
            toast.error("Full name must be at least 5 characters long");
            return;
        }
        
        const formData = new FormData();
        formData.append("fullName",data.fullName);
        formData.append("avatar",data.avatar);
      
        await disptach(updateProfile([data.userId,formData]))
        
        await disptach(getUserData())

        navigate("/user/profile")
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
            <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0,0,10px,black] ">
                <h1 className="text-3xl font-bold text-center"> Edit Profile</h1>
                <label className="cursor-pointer" htmlFor="image_uploads">
                    {data.previewImage ? (
                       <img
                       className="w-28 h-28 rounded-full m-auto"
                       src={data.previewImage}
                       alt="profile"
                       />
                    ):(
                    <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>)}

                </label>
                <input onChange={handleImageUpload} 
                    type="file"
                    className="hidden"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg ,.png, .svg ,.jpeg"
                />
                <div className="flex flex-col">
                    <label htmlFor="fullName" className="text-lg font-semibold">Full Name:</label>
                        <input
                        required
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter Your Name"
                        className="bg-transparent px-2 py-1 border"
                        value={data.fullName}
                        onChange={handleInputChange}

                        />
       
                </div>
                <button type="submit" className="w-full  bg-yellow-500  hover:bg-yellow-600 transition-all ease-in-out duration-300 text-white py-2 rounded-sm">
                    Update Profile
                </button>
                    <link to='/user/ptofile'>
                    <p className="link text-accent flex items-center justify-center cursor-pointer"> <AiOutlineArrowLeft/> | Go Back to Profile</p>
                    </link>
            </form>
            </div>
        </HomeLayout>
    )

}
export default EditProfile;