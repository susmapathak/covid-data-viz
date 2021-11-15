import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

//array to increment case sources to date, and rename data types to eliminate spaces

const groupBy = (array) => {
  return array.reduce((result, currentValue) => {
    switch (currentValue['likely_source_of_infection']) {
      case 'Overseas':
        if (!result[currentValue['notification_date']]) {
          result[currentValue['notification_date']] = {};
        }
        result[currentValue['notification_date']].overseas = (result[currentValue['notification_date']].overseas + 1) || 1;
        break;

      case 'Locally acquired - no links to known case or cluster':
        if (!result[currentValue['notification_date']]) {
          result[currentValue['notification_date']] = {};
        }
        result[currentValue['notification_date']].local_unlinked = (result[currentValue['notification_date']].local_unlinked + 1) || 1;
        break;

      case 'Locally acquired - linked to known case or cluster':
        if (!result[currentValue['notification_date']]) {
          result[currentValue['notification_date']] = {};
        }
        result[currentValue['notification_date']].local_linked = (result[currentValue['notification_date']].local_linked + 1) || 1;
        break;

      case 'Locally acquired - investigation ongoing':
        if (!result[currentValue['notification_date']]) {
          result[currentValue['notification_date']] = {};
        }
        result[currentValue['notification_date']].local_investigation = (result[currentValue['notification_date']].local_investigation + 1) || 1;
        break;

      case 'Interstate':
        if (!result[currentValue['notification_date']]) {
          result[currentValue['notification_date']] = {};
        }
        result[currentValue['notification_date']].interstate = (result[currentValue['notification_date']].interstate + 1) || 1;
        break;

    }

    return result;
  }, {});
};



function CovidChartBySource() {
  // API to fetch data from
  const url = "https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=2f1ba0f3-8c21-4a86-acaf-444be4401a6d&limit=100000"
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // function to fetch data and format it required by chart
  // || 0 to eliminate undefined data breaking graph


  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        const results = data.result.records
        console.log(results)

        const groupedData = groupBy(results)
        console.log(groupedData)

        const formattedData = [];
        for (const key in groupedData) {
          const groupData = {
            date: key,
            overseas: groupedData[key].overseas || 0,
            local_unlinked: groupedData[key].local_unlinked || 0,
            local_linked: groupedData[key].local_linked || 0,
            local_investigation: groupedData[key].local_investigation || 0,
            interstate: groupedData[key].interstate || 0
          }
          formattedData.push(groupData);
        }
        console.log(formattedData);
        setChartData(formattedData);
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="col-sm-8">
      <h2>NSW COVID-19 cases by source</h2>

      <AreaChart
        width={800}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="overseas" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="local_unlinked" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="local_linked" stackId="1" stroke="#f2d968" fill="#f2d968" />
        <Area type="monotone" dataKey="local_investigation" stackId="1" stroke="#f283ef" fill="#f283ef" />
        <Area type="monotone" dataKey="interstate" stackId="1" stroke="#7781f7" fill="#7781f7" />
      </AreaChart>
    </div>
  );
}

export default CovidChartBySource;