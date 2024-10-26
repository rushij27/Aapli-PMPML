import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, Settings, LogOut, HelpCircle, Contact } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const gotoHome = () => {
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <header className="flex justify-between w-full h-24 sm:h-28 items-center px-4 sm:px-8 py-4 sm:py-8"
                style={{ background: "#639359" }}
            >
                <div className="cursor-pointer" onClick={gotoHome}>
                    <img className="h-16 sm:h-24" src="/pmpml.png" alt="Apli PMPML" />
                </div>
                <div className="relative" ref={menuRef}>
                    <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer" onClick={toggleMenu}>
                        <p className="text-white text-sm sm:text-md font-bold">Welcome, User</p>
                        <img
                            src="./public/profile.png"
                            alt="User Profile"
                            className="h-10 rounded-full"
                        />
                        <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-600 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                    </div>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link
                                to="/profile"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-4 w-4 mr-2" />
                                Profile
                            </Link>
                            <Link
                                to="/complaints"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                Complaints
                            </Link>
                            <Link
                                to="https://pmpml.org/"
                                target="_blank"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Contact className="h-4 w-4 mr-2" />
                                About PMPML
                            </Link>
                            <Link
                                to="/help"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <HelpCircle className="h-4 w-4 mr-2" />
                                Help
                            </Link>
                            <div className="border-t border-gray-100"></div>
                            <div
                                className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Log out
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
