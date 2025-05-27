import { MdOutlineErrorOutline } from "react-icons/md"; 
import { Link } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";

function CheckoutFailure(){
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">Payment Failure</h1>

                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-bold">
                               Payment failed. Please try again.
                            </h2>
                            <p className="text-left">
                               click on the button below to try again.
                            </p>
                        </div>
                        <MdOutlineErrorOutline className="text-red-500 text-5xl"/> 
                    </div>
                    <Link to="/checkout" className="bg-red-500 hover:bg-red-800 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg" >
                    <button> Go To Dashboard</button> 
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutFailure;