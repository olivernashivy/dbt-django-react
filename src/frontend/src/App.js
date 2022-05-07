import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from './components/Home';
function App() {
  return (
    <div className="App">
       <div className="container-fluid">
    <div className="row">
        <div className="col-sm-auto bg-primary sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <i className="bi-house fs-1"></i>
                </a>
                <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li className="nav-item">
                        <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            
                            <i className="bi-alarm fs-1"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                            <i className="bi-speedometer2 fs-1"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                            <i className="bi-table fs-1"></i>
                        </a>
                    </li>
                </ul>
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi-person-circle h2"></i>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                       
                        <li><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-sm p-3 min-vh-100">
        <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />

          </Routes>
          </Router>
        </div>
    </div>
</div>
  
       
    </div>
  );
}

export default App;
