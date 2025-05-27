import AboutUsImage from"../assets/Images/Aboutus.jpg"
import CarouselSlide from "../Components/Slides/CarouselSlide"
import { celebrities } from "../constants/celebrities"
import HomeLayout from "../Layout/HomeLayout"
function AboutUs() {
 
   

  return (
        <HomeLayout>
          <div className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 space-y-10">
                  <h1 className="text-5xl text-yellow-500 font-semibold text-left">
                    Affordable and quality education
                  </h1>
                  <p className="text-xl text-gray-200 text-left ">
                    Education is right for everyone . Education is the transmission of knowledge, skills, and character traits and manifests in various forms. Formal education occurs within a structured institutional framework, such as public schools, following a curriculum. Non-formal education also follows a structured approach but occurs outside the formal schooling system 
                  </p>
                </section>
                <div className="w-1/2  ">
                  <img
                    id="test"
                    style={{
                      filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
                    }}
                    className="drop-shadow-2xl rounded-xl"
                    src={AboutUsImage}
                    alt="About Us Image"
                    />
                    
                  
                </div>
            </div>
            <div className="carousel w-1/2 m-auto my-16 rounded-3xl drop-shadow-2xl ">
                {celebrities && celebrities.map(celebrity =>( <CarouselSlide 
                                                                {...celebrity} 
                                                                 key={celebrities.slideNumber} totalSlides={celebrities.length} />) )}
                 
              </div>
          </div>
        </HomeLayout>
  )
}

export default AboutUs