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

// const url = "https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29&limit=1000"

function CovidBarChart() {
  // API to fetch data from
  const url = "https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=24b34cb5-8b01-4008-9d93-d14cf5518aec&limit=1000"
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
  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        const results = data.result.records
        const groupedData = groupBy(results, "age_group")
        const formattedData = [];
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
  }, []);

  return(
    <div className="col-sm-8">
      <h2>NSW COVID-19 cases by age range</h2>
      <BarChart
        width={800}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="case" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default CovidBarChart;