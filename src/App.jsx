import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [currentFloor, setCurrentFloor] = useState(() => {
    const savedFloor = localStorage.getItem("currentFloor");
    return savedFloor ? parseInt(savedFloor) : 1;
  });

  const [targetFloor, setTargetFloor] = useState(currentFloor);

  const [isLiftOn, setIsLiftOn] = useState(() => {
    const savedStatus = localStorage.getItem("isLiftOn");
    return savedStatus ? JSON.parse(savedStatus) : true;
  });

  const floors = [7, 6, 5, 4, 3, 2, 1];

  useEffect(() => {
    if (isLiftOn && currentFloor !== targetFloor) {
      const timer = setTimeout(() => {
        setCurrentFloor((prevFloor) =>
          prevFloor < targetFloor ? prevFloor + 1 : prevFloor - 1
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentFloor, targetFloor, isLiftOn]);

  useEffect(() => {
    localStorage.setItem("currentFloor", currentFloor);
  }, [currentFloor]);

  useEffect(() => {
    localStorage.setItem("isLiftOn", isLiftOn);
  }, [isLiftOn]);

  const goToFloor = (floor) => {
    if (isLiftOn) {
      setTargetFloor(floor);
    }
  };

  const handleCheckboxChange = () => {
    setIsLiftOn(!isLiftOn);
    if (!isLiftOn) {
      setTargetFloor(1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-800">
      <div className="bg-teal-700 p-6 rounded-lg">
        <div className="flex flex-col items-center space-y-2">
          {floors.map((floor) => (
            <div key={floor} className="flex items-center space-x-2">
              <span className="text-white">{floor}</span>
              <button
                onClick={() => goToFloor(floor)}
                className={`p-2 rounded-full ${
                  targetFloor === floor ? "bg-gray-500" : "bg-teal-900"
                } text-white`}
              >
                {targetFloor === floor ? "⬆️" : "⬇️"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-sky-200 w-32 h-64 relative flex items-end justify-center overflow-hidden">
          <div
            className="bg-gray-500 w-16 h-12 mb-2 flex items-center justify-center text-white font-bold transition-transform duration-1000"
            style={{
              transform: `translateY(-${(currentFloor - 1) * (100 / 2)}%)`,
            }}
          >
            {currentFloor}
          </div>
        </div>

        <div className="mt-4 flex justify-center items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isLiftOn && currentFloor > 1}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <div
              className={`toggle w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                isLiftOn ? "bg-teal-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  isLiftOn ? "transform translate-x-6" : ""
                }`}
              ></div>
            </div>
            <span className="text-white">
              {isLiftOn && currentFloor > 1 ? "On" : "Off"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
