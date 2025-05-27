import {configureStore} from '@reduxjs/toolkit'

import authSliceReducer from "./Slices/Authslice"
import courseSliceReducer from "./Slices/Courseslice"
import lectureSliceReducer from "./Slices/LectureSlice"
import razorPaySliceReducer from "./Slices/PaymentSlice"
import statSliceReducer from "./Slices/StatSlice"

const store = configureStore({
  reducer: {
    Auth: authSliceReducer,
    course: courseSliceReducer,
    rayzorpay:razorPaySliceReducer,
    lecture:lectureSliceReducer,
    stat:statSliceReducer
  },
  devTools: true,
});

export default store