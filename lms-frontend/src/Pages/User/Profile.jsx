
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { getUserData } from "../../Redux/Slices/Authslice";
import { cancelCourseBundle } from "../../Redux/Slices/PaymentSlice";


function Profile() {

const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector((state) => state.auth?.data);

async function handleCancellation(){

    toast("Initiating cancellation")
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/")
}


  return (
   <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
            <img
            src={userData?.avatar?.secure_url}
            alt="profile"
            className="w-40 m-auto rounded-full border border-black"
            />
            <h3 className="text-xl font-semibold text-center capitalize ">
                {userData?.fullname}
            </h3>\
            <div className="grid grid-cols-2">
                <p>Email:</p><p>{userData?.email}</p>
               
                <p>Role:</p><p>{userData?.role}</p>
            
                <p>subscription:</p><p>{userData?.subscription == "active" ? "active" : "inactive"}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
                <link 
                to={"/changepassword"} 
                className="w-1/2 bg-yellow-300 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center ">
                   <button>Change Password</button>
                </link>
                <link 
                to={"/user/editprofile"} 
                className="w-1/2 bg-yellow-300 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center ">
                   <button>Edit Profile</button>
                </link>
                {userData?.subscription?.status ==='active' && (
                    <button  onClick={handleCancellation} className="w-full bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                       Cancel Subscription 
                    </button>
                ) }
            </div>
        </div>
    </div>
   </HomeLayout>
  )
}

export default Profile