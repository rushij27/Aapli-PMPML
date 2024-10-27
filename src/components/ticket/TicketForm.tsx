import { ArrowLeft, BusFront, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formInputs } from '../../data/forms/forms.json';
import { useGeneralContext } from "../../generalContextApi";
import { ITimer } from "../../interfaces/forDailyPass";
import { SelectRoute, SelectStops } from "./RouteInfoCard";
import { Divider } from "@mui/material";

type SelectionType = 'fare' | 'stop' | null;

const TicketForm = () => {
  const navigate = useNavigate();
  const context: any = useGeneralContext();

  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selectedOption, setSelectedOption] = useState<SelectionType>('fare');
  const [selectedFare, setSelectedFare] = useState<string>('');  
  const [timer, setTimer] = useState<ITimer>({
    seconds: 0,
    minutes: 5,
    isSessionExpired: false
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const formattedTime = now.toLocaleTimeString();
      setCurrentDateTime(`${formattedDate} | ${formattedTime}`);
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    countDownTimer();
  }, [timer]);

  const countDownTimer = () => {
    if (timer.minutes === 0 && timer.seconds === 0) {
      setTimer((prev: any) => ({ ...prev, isSessionExpired: true }));
      context.setState((prev: any) => ({ ...prev, isSessionExpired: true }));
      return navigate('/');
    } else {
      let timerId = setTimeout(() => {
        if (timer.seconds === 0) {
          setTimer((prev: any) => ({
            ...prev,
            seconds: 59,
            minutes: timer.minutes - 1
          }));
        } else {
          setTimer((prev: any) => ({ ...prev, seconds: prev.seconds - 1 }));
        }
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }

  const handleGoBack = () => {
    navigate('/');
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2 py-12">
      <div className='min-h-screen px-2 py-4'>
        <div className='flex flex-row md:flex-row items-baseline justify-between font-maven space-y-4 md:space-y-0'>
          <div className='flex items-center cursor-pointer bg-slate-200 rounded-2xl p-2 md:p-2 mb-4 md:mb-0'
            onClick={handleGoBack}>
            <div className="h-6 w-6 p-1 md:h-8 md:w-8">
              <ArrowLeft />
            </div>
            <div><h1 className="text-sm md:text-base lg:text-md">&nbsp;{formInputs.back}&nbsp;</h1></div>
          </div>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{formInputs.passTitle}</h1>

          <div className='flex items-center bg-red-100 rounded-2xl p-2 md:p-3'>
            <Timer />
            <span className="text-sm md:text-base lg:text-md ml-2">
              {formInputs.timer} {timer.minutes} : {timer.seconds === 0 ? '00' : timer.seconds}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 p-4">
              <h2 className="text-lg font-medium text-center text-white">
                {currentDateTime}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-row items-center justify-start">
                <BusFront className="w-10 h-9 bg-green-700 rounded-full p-1 mr-4 ml-0" color="#ffffff" />
                <SelectRoute />
              </div>
              <Divider />
              <div><SelectStops /></div>
              <Divider />
            </div>
            {/* Fare and Stop Selection */}
            <div className="grid grid-cols-2 gap-4 px-6 py-4">
              <button className={`${selectedOption === 'fare' ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-green-700 hover:text-white'}
                border border-green-600 py-2 px-2 md:px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap`}
                type="button"
                onClick={() => setSelectedOption('fare')}
              >
                By Fare
              </button>
              <button className={`${selectedOption === 'stop' ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-green-700 hover:text-white'}
                border border-green-600 py-2 px-2 md:px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap`}
                type="button"
                onClick={() => setSelectedOption('stop')}
              >
                By Ending Stop
              </button>
            </div>
            {selectedOption === 'fare' && 
            <div>
              <label className="block mb-2 px-6 py-4">
                Ticket Price:
                {/* Logic is yet to be implemented */}
              {context.state?.selectedStops?.allFairs.length > 0 && context.state.selectedStops?.allFairs?.map((ele: any, i: number) => (
                <span key={i} className={`'bg-white text-gray-700 hover:bg-green-700 inline-block bg-gray-100 rounded-lg px-3 py-1 text-sm font-semibold mr-2 ml-2 mb-2 cursor-pointer`} onClick={() => setSelectedFare(ele)}>{ele}</span>
              ))}
              </label>
            </div>}
          </div>
        </div>
      </div>
    </div>

  )
}

export default TicketForm;