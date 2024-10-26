import { Link } from "react-router-dom";

const PassCard = () => {
    return (
        <>
            <div className="group w-full sm:w-auto">
                <Link to="/view-pass">
                    <div className="flex items-center justify-center bg-blue-200 w-full h-20 sm:w-48 md:w-56 lg:w-64 sm:h-24 rounded-lg cursor-pointer shadow-sm transform group-hover:scale-105 transition-all duration-300 ease-in-out">
                        <img src="/public/ticket.png" className="w-14 h-14 sm:w-14 sm:h-14" />
                    </div>
                </Link>
                <h1 className="text-lg sm:text-xl font-medium text-center mt-2 group-hover:text-blue-600 transition-colors duration-300">
                    View Pass
                </h1>
            </div>
        </>
    )
}

export default PassCard;