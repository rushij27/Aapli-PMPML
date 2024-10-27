
import { ArrowLeft, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formInputs } from '../../data/forms/forms.json';
import { useGeneralContext } from '../../generalContextApi';
import { ITimer } from '../../interfaces/forDailyPass';
import Divider from '../ui/Divider';

export default function PassForm() {
  const navigate = useNavigate();
  const context: any = useGeneralContext();

  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    label: '',
    amount: 0,
    validIn: ''
  });
  const [inputNumber, setInputNumber] = useState('');
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

  const handleNumberInput = ({ target: { value } }: any) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setInputNumber(value);
    }
  };

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
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 p-4">
              <h2 className="text-lg font-medium text-center text-white">
                {currentDateTime}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {formInputs.dailyassOptions.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`
                  p-3 rounded-lg border-2 transition-all duration-200
                  ${selectedOption.label === option.label
                        ? 'border-green-500 bg-green-50 text-green-700 font-medium'
                        : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                      }
                `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {selectedOption.label && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-md text-sm">
                  <p className="font-medium">{selectedOption.validIn}</p>
                </div>
              )}

              <Divider />

              <div className="space-y-2">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  {formInputs.lastDigits}
                </label>
                <input
                  id="number"
                  type="text"
                  maxLength={4}
                  value={inputNumber}
                  onChange={handleNumberInput}
                  placeholder={formInputs.lastDigits}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {(selectedOption || inputNumber) && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-md text-sm">
                  <p className="font-medium text-yellow-600"> {formInputs.idInstruction}</p>
                </div>
              )}

              <Divider />

              <div className="flex justify-between">
                <div className="font-bold">{formInputs.amount}</div>
                <div className="font-bold">${selectedOption.amount}.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}