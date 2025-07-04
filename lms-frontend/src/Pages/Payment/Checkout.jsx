import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/PaymentSlice.js";

function Checkout() {
 const dispatch = useDispatch();
 const navigate =useNavigate();
 const razorpayKey = useSelector((state) =>state?.razorpay?.key);
 const subscription_id = useSelector((state) =>state?.razorpay?.subscription_id);
//  const isPaymentVerified = useSelector((state) =>state?.razorpay?.isPaymentVerified);
 const userData = useSelector((state ) => state?.auth?.data);
 const paymentDetails = {
    razorpay_payment_id:"",
    razorpay_subscription_id:"",
    razorpay_signature:"",
 }

 async function handleSubscription(e) {
    e.preventDefault()
    if(!razorpayKey || !subscription_id){
        toast.error("something went wrong ");
        return;
        
    }
    const options ={
        key:razorpayKey,
        subscription_id:subscription_id,
        name:"learning pvt limited",
        description:"course bundle subscription",
        theme:{
         primaryColor:"#3399cc",
        },
        prefill:{
         email: userData.email,
         name:userData.fullname,
        },
         handle: async function(response){
            paymentDetails.razorpay_payment_id=response.razorpay_payment_id,
            paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id,
            paymentDetails.razorpay_signature=response.razorpay_signature, 

            toast.success("payment is successfull")
            const res = await dispatch(verifyUserPayment(paymentDetails));
            (res?.payload?.success )? navigate("/checkout/success") : navigate("/checkout/fail");
         }
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
 }

 async function load(){
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle())
 }

 useEffect(()=>{
    load()
 },);
 return (
   <HomeLayout>
      <form 
         onSubmit={handleSubscription}
         className="min-h-[90vh] flex items-center justify-center text-white"
         >
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
               <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl  fold font-bold rounded-tl-lg">Course Bundle Subscription </h1>
               <div className="px-4 space-y-5 text-center">
                     <p className="text-[17px]">
                     This purschase help you to access all the course bundle of our paltforn {""}
                     <span className="text-yellow-500 text-bold">
                       <br/>
                       1 Year Duration
                     </span>
                     Also available existing course and new course will be available in future
                     </p>
                     <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-400">
                     <BiRupee /><span></span>
                     </p>
                     <div className="text-gray-300">
                        <p>100% Refund on cancellation</p>
                        <p>Refund will be processed within 24 hours</p>
                        <p>Terms and condition apply</p>
                     </div>
                     <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2 ">
                        Buy Now
                     </button>
               </div>
            </div>
         </form>
   </HomeLayout>
 )

}
export default Checkout