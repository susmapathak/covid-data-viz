import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

const COLORS = ['#5F9EA0', '#FFF8DC', '#008B8B', '#00FFFF', '#00CED1', '#87CEFA', '#B0C4DE', '#FFE4E1', '#48D1CC', '#98FB98', '#FFC0CB', '#B0E0E6', '#FA8072', '#D8BFD8', '#FFE4B5', '#87CEEB', '#AFEEEE', '#FFE4B5', '#BC8F8F', '#87CEEB',];

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
      <h2>NSW COVID-19 cases by LGA </h2>
      <label>
        Select Number of Records:
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
      <PieChart width={800} height={680}>
        <Pie
          dataKey="case"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={250}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Bar Chart */}
      <BarChart
        width={800}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 120
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="case" fill="#48D1CC" />
      </BarChart>
    </div>
  );
}

export default CovidCasesByLga;