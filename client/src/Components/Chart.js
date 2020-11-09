import React from 'react';
import dayjs from 'dayjs';
import { Bar, Line, Pie } from 'react-chartjs-2';

const Chart = ({ data }) => {
  let chartData = undefined;

  if (data.length > 0) {
    chartData = {
      // country: data.Country[0],
      // startDate: dayjs(data.Date[0]).format('YYYY.MMM.DD'),
      // endDate: dayjs(data.Date[data.length - 1]).format('YYYY.MMM.DD'),
      labels: data.map((entry) => dayjs(entry.Date).format('YYYY.MMM.DD')),
      datasets: [
        {
          label: 'Deaths',
          data: data.map((entry) => entry.Deaths),
          backgroundColor: 'red',
        },
        {
          label: 'Confirmed',
          data: data.map((entry) => entry.Confirmed),
          backgroundColor: 'orange',
        },
        {
          label: 'Active',
          data: data.map((entry) => entry.Active),
          backgroundColor: 'green',
        },
      ],
    };
  }

  return (
    <div className='Chart'>
      Chart
      <Line
        data={chartData}
        options={{
          // title: {
          //   display: true,
          //   text: `${country}`,
          // },
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default Chart;
