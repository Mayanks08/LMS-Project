import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CoursesCard from '../../Components/coursesCard'
import HomeLayout from '../../Layout/HomeLayout'
import { getAllCourses } from '../../Redux/Slices/Courseslice'

export default function CourseList() {
    const dispatch = useDispatch() 
 
    const {courseData} = useSelector((state) =>state.course);

    async function loadCourses(){
        await dispatch(getAllCourses())

    }

    useEffect(( ) =>{
        loadCourses();
    })

    return (
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white  ">
          <h1 className="text-center text=3xl font-semibold mb-5">
            Explore The Courses made by{" "}
          </h1>
          <span className="text-yellow-500 font-bold "> Experts</span>
          <div className="mb-10 flex flex-wrap gap-14">
            {courseData?.map((element) => {
              return <CoursesCard key={element._id} data={element} />;
            })}
          </div>
        </div>
      </HomeLayout>
    );
}
