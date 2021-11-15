import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
// } from "recharts";

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// this is visual part
function CovidCasesByLga() {
  const [recordNumber, setRecordNumber] = useState(100);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // function to fetch data and format it required by chart
  // Data format for chart
  // [
  //   {
  //     name: 'AgeGroup_0-19',
  //     case: 20
  //   },
  //   {
  //     name: 'AgeGroup_20-24',
  //     case: 20
  //   }
  // ]
  // API to fetch data from
  let url = "https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29&limit=" + recordNumber
  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        const results = data.result.records
        const groupedData = groupBy(results, "lga_name19")
        const formattedData = [];
        console.log(groupedData)
        for (const key in groupedData) {
          const groupData = {
            name: key,
            case: groupedData[key].length,
          }
          formattedData.push(groupData)
        }
        setChartData(formattedData);
      })
  };

  useEffect(() => {
    fetchData();
  }, [recordNumber]);

  return(
    <div className="col-sm-8">
      <h2>NSW COVID-19 cases by age range in BarChart</h2>
      <label>
        Select Number of Data:
        <select value={recordNumber} onChange={e => setRecordNumber(e.target.value)}>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="1500">1500</option>
          <option value="2000">2000</option>
          <option value="2500">2500</option>
          <option value="3000">3000</option>
        </select>
      </label>

      {/* Pie Chart */}
      <PieChart width={800} height={800}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          // labelLine={false}
          label
          outerRadius={300}
          fill="#8884d8"
          dataKey="case"
          isAnimationActive={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
          <Tooltip isAnimationActive={false} />
        </Pie>
      </PieChart>
    </div>
  );
}

export default CovidCasesByLga;