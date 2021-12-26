import React from "react";

const About = (props) => {
  return (
    <div className="flex flex-col items-center justify-around xl:flex-row xl:items-center xl:h-36 ">
      <div className="wrapper  flex flex-col p-1 flex-1 items-center">
        <h2 className="text-gray-200 text-lg p-1 font-medium">Rishabh Singh</h2>
        <p className="text-gray-300 px-2 text-sm font-medium">
          Marketing Executive, Co-Founder
        </p>
        <p className="text-gray-300 px-1 font-medium flex items-center">
          <span>
            <svg
              className="w-4 h-4 mx-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          rsspykar@gmail.com
        </p>
      </div>
      <div className="wrapper flex flex-col p-1 flex-1 items-center">
        <h2 className="text-gray-200 text-lg p-1 font-medium">
          Rahul Prajapati
        </h2>
        <p className="text-gray-300 px-2 text-sm font-medium">
          Design Executive , Co-Founder
        </p>
        <p className="text-gray-300 px-1 font-medium flex items-center">
          <span>
            <svg
              className="w-4 h-4 mx-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          rahulprajapati000@gmail.com
        </p>
      </div>

      <div className="wrapper flex flex-col p-1 flex-1 items-center">
        <h2 className="text-gray-200 text-lg p-1 font-medium">Alok Dhiman</h2>
        <p className="text-gray-300 px-2 text-sm font-medium">
          Technical officer , Co-Founder
        </p>
        <p className="text-gray-300 px-1 font-medium flex items-center">
          <span>
            <svg
              className="w-4 h-4 mx-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          alokdhiman018@gmail.com
        </p>
      </div>
    </div>
  );
};

export default About;
