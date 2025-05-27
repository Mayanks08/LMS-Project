import { ArcElement, BarElement,CategoryScale,Chart as ChartJS, Legend,LinearScale ,Title,Tooltip} from "chart.js"
import { useEffect } from "react";
import { Bar, Pie } from 'react-chartjs-2'
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/Courseslice";
import { getPaymentRecord } from "../../Redux/Slices/PaymentSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register( ArcElement, BarElement,CategoryScale,Legend,LinearScale ,Title,Tooltip);

function AdminDashboard(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUserCount ,subscribedCount} =   useSelector((state) => state.stat);
    const {  allPayments,monthlySalesRecord} =   useSelector((state) => state.razorpay);

    const  userData ={
        labels:["Registered User", "Enrolled User"],
        fontColor:"white",
        datasets: [
            {
                label:"User Details",
                data: [allUserCount,subscribedCount],
                backgroundColor: [
                    "yellow","green"
                ],
                borderwidth:1,
                borderColor: [
                    "yellow","green"
                ]

            }
        ]
    }
    const salesData ={
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        fontColor:"white",
        datasets: [
           {
             label: "Sales/Month",
             data: monthlySalesRecord,
             backgroundColor: ["rgb(255 ,99, 132)"],
             borderColor: ["white"],
             borderwidth:2
             }
        ]
    };

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete this course?")){
            const res = await dispatch(deleteCourse(id));
            if(res?.payload?.success){
                await dispatch(getAllCourses())
            }
        }
    }

    useEffect(() =>{
        (
            async () => {
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                await dispatch(getPaymentRecord());
            }
        )
    },[]);

    return (
        <HomeLayout>
            <div className="m-h[90vh] pt-5 flex flex-col flex-warp gap-10 text-white">
                <h1 className="text-4xl text-center font-semibold text-yellow-300">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 shadow-md rounded-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold ">Registerd Users</p>
                                    <h3 className="text-4xl font-bold">{allUserCount}</h3>
                                </div>
                                <FaUsers className="text-4xl text-yellow-500" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 shadow-md rounded-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold ">Subscribed Users</p>
                                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                                </div>
                                <FaUsers className="text-4xl text-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-full h-80 relative">
                            <Bar className="absolute bottom-0 h-80 w-full" data={salesData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                             <div className="flex items-center justify-between p-5 gap-5 shadow-md rounded-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold "> Subscription Count Users</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-4xl text-yellow-500" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 shadow-md rounded-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold "> Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count*499}</h3>
                                </div>
                                <GiMoneyStack className="text-4xl text-green-500" />
                            </div>
                        </div>
                    </div>

                </div>
           
                    <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-5 mb-10">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-center text-3xl font-semibold">
                                Courses Overview
                            </h1>

                            <button onClick={()=>{navigate("/course/create")}} className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200 rounde py-2 px-2 font-semibold text-lg cursor-pointer">
                                Create New Course
                            </button>
                        </div>
                    <div>
                        <table className="table overflow-x-scroll ">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Course Title</th>
                                    <th>Course category</th>
                                    <th>Instructor</th>
                                    <th>Total Lecture</th>
                                    <th>Discription</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {myCourses?.map((course,idx)=>{
                                    return(
                                        <tr key={course._id}>
                                            <td>{idx+1}</td>
                                            <td>
                                                <textarea readOnly value={course?.title} className="w-40 h auto bg-transparent resize-none">
                                                </textarea>
                                            </td>
                                            <td>{course?.category}</td>
                                            <td>{course?.createdBy}</td>
                                            <td>{course?.numberOfLecture}</td>
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                                <textarea readOnly value={course?.description} className="w-80 h-auto bg-transparent resize-none"></textarea>
                                            </td>
                                            <td className="flex items-center gap-4">
                                                <button className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl px-4 py-2 rounded-md font-bold"  onClick={()=> navigate("/course/displaylectures",{state:{...course}})}>
                                                    <BsCollectionPlayFill/>
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl px-4 py-2 rounded-md font-bold"  onClick={()=>  onCourseDelete(course?._id) }>
                                                    <BsTrash/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>

                    </div>
                
            </div>
        </HomeLayout>
    )

}

export default AdminDashboard