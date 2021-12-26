import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const Graph = ({ dateArray, priceArray, index, selected }) => {
  const [graphToggle, setGraphToggle] = useState(false);
  const chartData = {
    labels: ["", ...dateArray],
    datasets: [
      {
        label: "Price Chart",
        data: [0, ...priceArray],
        backgroundColor: "rgb(169, 199, 249)",
        borderColor: "rgb(87, 81, 255)",
        borderWidth: 1,
        hoverBorderColor: "rgba(0, 0, 0 ,0.4)",
        pointRadius: 5,
        tension: 0.3,
        borderWidth: 1,
        hoverBorderWidth: 5,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full">
      <div
        className="flex flex-col items-center mt-2"
        onClick={() => {
          {
            setGraphToggle(!graphToggle);
          }
        }}
      >
        {!graphToggle && (
          <svg
            className="w-5 h-5 m-1 font-bold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        )}
        {graphToggle && (
          <svg
            className="w-5 h-5 m-1 font-bold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
      </div>

      <div className={graphToggle ? "w-full" : "hidden"}>
        <Line
          data={chartData}
          options={{
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
            maintainAspectRatio: true,
            maintainAspectRatio: true,
            layout: {
              padding: {
                left: 5,
                top: 10,
              },
            },
            tooltips: {
              backgroundColor: "rgb(117, 184, 239)",
            },
            legend: {
              display: false,
            },
            animation: {
              duration: 2000,
            },
          }}
        ></Line>
      </div>
    </div>
  );
};

export default Graph;
