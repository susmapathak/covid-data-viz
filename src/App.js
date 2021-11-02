import './App.css';
import CovidBarChart from './components/CovidBarChart';

// this is from recharts library (https://recharts.org/en-US)
// this library is used to display charts like Bar charts, Pie charts,etc.


function App() {
  return (
    <div className="wrapper">

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
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
                <a className="nav-link active" href="#">Cases By Age Group</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cases By LGA</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cases By </a>
              </li>
            </ul>
            <hr className="d-sm-none"/>
          </div>
          <CovidBarChart/>

        </div>
      </div>



    </div>
  );
}

export default App;
