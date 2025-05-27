import { useState } from "react";
import {toast} from "react-hot-toast"
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/RegexMatcher";
import HomeLayout from "../Layout/HomeLayout";
import { createAccount } from "../Redux/Slices/Authslice";

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [previewImage, setPreviewImage] = useState('')
    const [SignupData, setSignupData] = useState({
      fullname:'',
      email:'',
      password:'',
      avatar:''
    })

     function handleUserInput(e) {
      const {name,value} = e.target;
      setSignupData({
        ...SignupData,
        [name]:value
      })
    }
     function getImage(event) {
       event.preventDefault();
      // getting image
       const uploadedImage = event.target.files[0];

       if(uploadedImage){
        setSignupData({
          ...SignupData,
          avatar: uploadedImage

        })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function (){
          setPreviewImage(this.result);
        })
       }
    }
    async function createNewAccount(event){
        event.preventDefault();
        //giving user enteries to backend
        if(!SignupData.email || !SignupData.password || !SignupData.fullname || !SignupData.avatar){
          toast.error('Please fill all the fields')
          return
        }

        // checking fullname length
        if(SignupData.fullname.length < 5){
          toast.error('Fullname should be at least 5 characters long')
          return
        }
         // checking for email validation
        if(isEmail(SignupData.email)){
          toast.error('Invalid email')
          return
        }

        // checking Password validation
        if (isValidPassword(SignupData.password)) {
          toast.error(
            "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:r"
          );
        }
        const  formData = new formData();
        formData.append('email',SignupData.email);
        formData.append('password',SignupData.password);
        formData.append("fullName",SignupData.fullname)
        formData.append("avatar", SignupData.avatar)
        
        // Disptach for creating account 
        const response = await dispatch(createAccount(formData))
        if (response?.payload?.success) 
        navigate("/")

        setSignupData({
          email: "",
          password: "",
          fullname: "",
          avatar: "",
        })
          setPreviewImage("")
    }

    return(
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_#F5F7F8]">
          <h1 className="text-center text-2xl font-bold">Registration Pages</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
                <img src={previewImage} alt="Preview Image" className="w-24 h-24 rounded-full m-auto"/>
            ):(
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
            )}
            </label>
            <input className="hidden"            
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg , .png , .svg"
              onChange={getImage}
              />
              <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-semibold">Name</label>
              <input
              type="Text"
              required
              id="fullName"
              name="fullName"
              placeholder="Enter yor Name.."
              className="bg-transparent px-2 py-3 border "
              onChange={handleUserInput}
              value={SignupData.fullname}
              />
              </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">Email</label>
              <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Enter yor email.."
              className="bg-transparent px-2 py-3 border "
              onChange={handleUserInput}
              value={SignupData.email}
              />
               <label htmlFor="password" className="font-semibold">Password</label>
              <input
              type="password"
              required
              id="password"
              name="password"
              placeholder="Enter yor password.."
              className="bg-transparent px-2 py-3 border "
              onChange={handleUserInput}
              value={SignupData.password}
              />
            </div>
            <button type="submit" className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
              Create Account
            </button>
            <p className="text-center">
              Already have an account? <Link to="/login" className="link text-accent cursor-pointer"> Login</Link>
            </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;