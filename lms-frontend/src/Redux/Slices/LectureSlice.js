import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const  initialState = {
    lectures :[]
}
export const getCourseLectures = createAsyncThunk("/course/lecture/get",
    async (cid) =>{
        try {
            const response = axiosInstance.get(`/courses/${cid}`)
            toast.promise(response,{
                loading:"Leacture Fetching . Please wait ",
                success:"Lecture Fteched successfully",
                fail:"Something went Wrong . Failed to get Lectures "
            })
            return  (await response).data
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }

    }
)

export const addCourseLectures = createAsyncThunk("/course/lecture/add",
    async (data) =>{
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("lecture", data.lecture);

            const response = axiosInstance.post(`/course/${data.id}`, formData)
            toast.promise(response,{
                loading:"  Please wait , Adding lecture",
                success:"Successfully Added ",
                fail:"Something went Wrong . Failed to Adding Lectures "
            })
            return  (await response.data)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }

    }
)

export const deleteCourseLectures = createAsyncThunk("/course/lecture/delete",
    async (data) =>{
        try {
            
            const response = axiosInstance.delete(`/course?coursId=${data.courseId}&lectureId=${data.lectureId}`, )
            toast.promise(response,{
                loading:"  Please wait , Deleting lecture",
                success:"Successfully Delete ",
                fail:"Something went Wrong . Failed to deleting  Lectures "
            })
            return  (await response.data)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }

    }
)

const lectureSlice =createSlice({
    name : 'lecture',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures
        })
        builder.addCase(addCourseLectures.fulfilled, (state, action) => {
            state.lectures =action?.payload?.course?.lectures;
            })
    }
})

export default lectureSlice.reducer