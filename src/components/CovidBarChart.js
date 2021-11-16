import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

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

// this is visual part
function CovidBarChart() {
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
  let url = "https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=24b34cb5-8b01-4008-9d93-d14cf5518aec&limit=" + recordNumber
  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        const results = data.result.records
        const groupedData = groupBy(results, "age_group")
        const formattedData = [];
        console.log(groupedData)
        for (const key in groupedData) {
          const groupData = {
            name: key,
            case: groupedData[key].length
          }
          formattedData.push(groupData)
        }
        setChartData(formattedData);
      })
  };

  useEffect(() => {
    fetchData();
  }, [recordNumber]);

  return (
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
        {/* <XAxis dataKey="name" interval={0} sclaeToFit="true" textAnchor="end" verticalAnchor="start" angle="-40" /> */}
        <XAxis dataKey="name" textAnchor="end" sclaeToFit="true" verticalAnchor="start" interval={0} angle="-40" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="case" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default CovidBarChart;