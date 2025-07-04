import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key:"",
    subscription_id:"",
    subscription_name:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonth:{},
    monthlySalesRecord:[],

}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async ()=>{
    try {
        const response = await axiosInstance.get("/payments/razorpay-key")
        return response.data;
    } catch (error) {
        toast.error("Failed to the Data")
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async ()=>{
    try {
        const response = await axiosInstance.post("/payments/subscribe")
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data)=>{
    try {
        const response = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        }
            
        )
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const getPaymentRecord = createAsyncThunk("/payments/record", async ()=>{
    try {
        const response =  axiosInstance.get("/payments?count=100");
        toast.promise(response,{
            pending:"Getting Payment Record",
            success:(data) =>{
                return data?.data?.message
            },
            erorr:"Failed to get Payment Record"
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation Failed")
    }
})

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async ()=>{
    try {
        const response =  axiosInstance.post("/payments/unsubscribe");
        toast.promise(response,{
            pending:"Unsubscribe in Progress",
            success:(data) =>{
                return data?.data?.message
            },
            erorr:"Failed to Unsubscribe"
        })
        return ( await response).data;
    } catch (error) {
        toast.error(error?.reponse?.data?.message)
    }
})

const razorPaySlice = createSlice({
    name: 'razorPay',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action) =>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action) =>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.isPaymentVerified;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.isPaymentVerified;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments= action?.payload?.allPayments
            state.finalMonth=action?.payload?.finalMonth
            state.monthlySalesRecord= action?.payload?.monthlySalesRecord
        })
    }
})

export default razorPaySlice.reducer