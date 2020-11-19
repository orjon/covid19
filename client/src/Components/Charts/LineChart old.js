import React, { useState, useEffect, useRef } from 'react';
// import { Line } from 'react-chartjs-2';
import Chartjs from 'chart.js';
import '../../styles/Chart.scss';

const LineChart = ({ chartData }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartData);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, chartData]);

  //   useEffect(() => {
  // updateDataset(0, data)
  //   },[chartData])

  //   const updateDataset = (datasetIndex, newData) => {
  //     chartInstance.data.datasets[datasetIndex].data = newData;
  //     chartInstance.update();
  //   };

  // const onButtonClick = () => {
  //   const data = [1, 2, 3, 4, 5, 6];
  //   updateDataset(0, data);
  // };

  return (
    <div className='LineChart'>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default LineChart;

//  <div className='LineChart'>
// <Line
//   data={chartData}
//   options={{
//     legend: {
//       display: true,
//       position: 'right',
//       labels: {
//         boxWidth: 20,
//       },
//     },
//     scales: {
//       xAxes: [
//         {
//           ticks: {
//             minRotation: 90,
//             maxTicksLimit: 42,
//           },
//         },
//       ],
//     },
//     maintainAspectRatio: false,
//   }}
// />
// </div>
