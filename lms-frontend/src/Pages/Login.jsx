import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { login } from "../Redux/Slices/Authslice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
    
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...LoginData,
      [name]: value,
    });
  }
 
  async function onLogin(event) {
    event.preventDefault();
    //giving user enteries to backend
    if (
      !LoginData.email || !LoginData.password 
    ) {
      toast.error("Please fill all the fields");
      return;
    }


    // Disptach for creating account
    const response = await dispatch(login(LoginData));
    if (response?.payload?.success) 
    navigate("/");

    setLoginData({
      email: "",
      password: "",
      
    });
    
  }

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_#F5F7F8]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          
           
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Enter yor email.."
              className="bg-transparent px-2 py-3 border "
              onChange={handleUserInput}
              value={LoginData.email}
            />
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              id="password"
              name="password"
              placeholder="Enter yor password.."
              className="bg-transparent px-2 py-3 border "
              onChange={handleUserInput}
              value={LoginData.password}
            />
          </div>
          <button
            type="submit"
            className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Login
          </button>
          <p className="text-center">
            Donot hanve an account ?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer">
              {" "}
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
