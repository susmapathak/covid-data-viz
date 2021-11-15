import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import CovidBarChart from './components/CovidBarChart';
import CovidChartBySource from './components/CovidChartBySource';
import CovidCasesByLga from './components/CovidCasesByLga';

// this is from recharts library (https://recharts.org/en-US)
// this library is used to display charts like Bar charts, Pie charts,etc.


function App() {
  const [chartType, setChartType] = useState('case_by_age_group');

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log("render!");

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log("unmounting...");
  });

  return (
    <div className="wrapper">

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="CovidBarChart.js">Covid-19 Data</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Pathogeny</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Symptoms</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Call Help</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <br/>
        <div className="row">
          <div className="col-sm-4">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className={`nav-link ${chartType === 'case_by_age_group' ? 'active' : ''}`} href="#" onClick={e => setChartType('case_by_age_group')}>Cases By Age Group</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${chartType === 'case_by_source' ? 'active' : ''}`} href="#" onClick={e => setChartType('case_by_source')}>Cases By Source</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${chartType === 'case_by_lga' ? 'active' : ''}`} href="#" onClick={e => setChartType('case_by_lga')}>Cases By LGA</a>
              </li>
            </ul>
            <hr className="d-sm-none"/>
          </div>
          {chartType === 'case_by_age_group' && <CovidBarChart />}
          {chartType === 'case_by_source' && <CovidChartBySource />}
          {chartType == 'case_by_lga' && <CovidCasesByLga />}

        </div>
      </div>



    </div>
  );
}

export default App;
