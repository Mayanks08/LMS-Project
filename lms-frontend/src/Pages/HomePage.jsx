
import { Link } from 'react-router-dom'

import HomePageImage from'../assets/Images/HomePageImage.jpg'
import HomeLayout from '../Layout/HomeLayout'

function HomePage() {
  return (
    <HomeLayout>
        <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
            <div className='w-1/2 space-y-6'>
              <h1 className="text-5xl font-semibold">
               Find Out Best
                  <span className="text-yellow-500 font-bold">
                   Online Courses
                  </span>
              </h1>
              <p className='text-xl text-gray-200 '>
                We have a large library of Courses taught  by highly skilled teacher at very affordable price.
              </p>
              <div className='space-x-6'>
                <Link to="/courses">
                  <button className='bg-yellow-500 px-5 py-3 rounded-md text-xl cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                    Explore courses
                  </button>
                </Link>
                <Link to="/contact">
                  <button className='border border-yellow-500 font-semibold px-5 py-3 rounded-md text-xl cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                    Contact us
                  </button>
                </Link>
              </div>
            </div>
                <div className="w-1/2 flex items-center justify-center ">
                  <img className='rounded-lg' alt="homepage image" src={HomePageImage}  />
                  
                </div>
        </div>
    </HomeLayout>
  )
}

export default HomePage