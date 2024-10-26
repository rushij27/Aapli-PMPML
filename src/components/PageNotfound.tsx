import { Link } from "react-router-dom";
import Header from "../Header";

const PageNotFound = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify">
        {/* <img src="./../public/404.png" alt="404" className="w-64 h-64" /> */}
        <Header />
        <h1 className="text-5xl font-bold mb-4 mt-6" style={{ color: "#639359" }}>404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="text-white px-6 py-2 rounded-lg" style={{ backgroundColor: "#639359" }}>
          Go Back to Home
        </Link>
        <img src="https://pmpml.org/plugins/images/foot.png" className="img-fluid"></img>
      </div>
    );
  };
  
  export default PageNotFound;
  