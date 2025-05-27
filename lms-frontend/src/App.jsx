import './App.css'

import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/AuthFile';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import  CourseDescription  from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import CreateCrourse from './Pages/Course/CreateCrourse';
import AddLectures from './Pages/DashBoard/AddLectures';
import AdminDashboard from './Pages/DashBoard/AdminDashboard';
import Displaylectures from './Pages/DashBoard/Displaylectures';
import DeniedPage from './Pages/DeniedPage';
import HomePage
from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Checkout from './Pages/Payment/Checkout';
import CheckoutFailure from './Pages/Payment/CheckoutFailure';
import CheckoutSuccesss from './Pages/Payment/CheckoutSuccess';
import SignUp from './Pages/SignUp';
import EditProfile from './Pages/User/EditProfile';
import Profile from './Pages/User/Profile';



function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/denied" element={<DeniedPage />}></Route>

        <Route path="/course/description" element={<CourseDescription />}></Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCrourse />}></Route>
          <Route path="/course/addlecture" element={<AddLectures />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>

        </Route>

        <Route element={<RequireAuth allowedRoles={["USER","ADMIN"]} />}>
        <Route path="/user/profile" element={<Profile />}></Route>
        <Route path="/user/editprofile" element={<EditProfile />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/checkout/success" element={<CheckoutSuccesss />}></Route>
        <Route path="/checkout/fail" element={<CheckoutFailure />}></Route>
        <Route path="/course/displaylecture" element={<Displaylectures />}></Route>
        </Route>

        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App
