import { Link } from "react-router-dom"

const RouteCard = () => {
  return (
    <>
      <div className="group w-full sm:w-auto">
        <Link to="/search-route">
          <div className="flex items-center justify-center bg-blue-200 w-full h-20 sm:w-48 md:w-56 lg:w-64 sm:h-24 rounded-lg cursor-pointer shadow-sm transform group-hover:scale-105 transition-all duration-300 ease-in-out">
            <img src="./public/route.png" className="w-10 h-12 sm:w-10 sm:h-12" />
          </div>
        </Link>
        <h1 className="text-lg sm:text-xl font-medium text-center mt-2 group-hover:text-blue-600 transition-colors duration-300">
          Route Timetable
        </h1>
      </div>
    </>
  )
}

export default RouteCard;