import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/RegexMatcher";
import HomeLayout from "../Layout/HomeLayout";


function ContactUs() {

  const [userInput, setUserInput] = useState(
    {
      name: "",
      email: "",
      message: "",

    })

   function handleInputchange(e){
    const [name , value] = e.target;
    setUserInput({...userInput,[name]:value})
   }

   async function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.email || 
      !userInput.name || 
      !userInput.message 
    ){
     toast.error("Please fill all the fields");
      return;
    }
    if (isEmail(userInput.email)) {
     toast.error("Email is invalid");
     return;
   }
   try {
      const response = axiosInstance.post("/contact",userInput);
      toast.promise(response,{
        loading: 'Sending message...',
        success: 'Message sent successfully',
        error: 'Failed to send message'
      })
      const contactResponse = await response;
      if(contactResponse?.data?.success){
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
   } catch (error) {
      toast.error("Operation Failed....")
   }
   }


  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form  noValidate onSubmit={onFormSubmit}
        className="felx flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem] ">
          <h1 className="Text-3xl font-semibold ">Contact Form</h1>
          <div className="flex flex-col w-full gap-1 mt-3">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent broder px-2 py-1 rounded-sm"
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleInputchange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col w-full gap-1 mt-3">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent broder px-2 py-1 rounded-sm"
              id="email"
              type="email"
              placeholder="Enter your Email"
              onChange={handleInputchange}
              value={userInput.email}
            />
          </div>
          <div className="flex flex-col w-full gap-1 mt-3">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent broder px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              placeholder="Enter your Message"
              onChange={handleInputchange}
              value={userInput.message}
            />
          </div>
          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 mt-4 font-semibold cursor-pointer text-lg">
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ContactUs;