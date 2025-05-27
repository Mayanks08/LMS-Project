import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: []
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response =  axiosInstance.get("/courses");
    toast.promise(response,{
        loading: 'Loading courses data...',
        success: 'Courses loaded Successfully',
        error: 'Fail to load Courses'
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response =  axiosInstance.delete(`/course/${id}`);
    toast.promise(response,{
        loading: 'Deleting courses ',
        success: 'Courses delete Successfully',
        error: 'Fail to delete Courses'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk("/course/create", async (data)=>{
  try {
    let formData= new FormData();
    formData.append('title', data?.title);
    formData.append('description', data?.description);
    formData.append('createdBy', data?.CretedBy);
    formData.append('category', data?.category);
    formData.append('thumbnail', data?.thumbnail);
    const response =  axiosInstance.post("/courses", formData);
    toast.promise(response,{
      loading: 'Creating new course...',
      success: 'Course created Successfully',
      error: 'Fail to create Course'
      });
      return (await response).data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
        if(action.payload){
          console.log(action.payload)
            state.courseData = [...action.payload]
        }
    })
  }
});

export default courseSlice.reducer;
