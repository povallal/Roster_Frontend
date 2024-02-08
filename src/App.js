import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route,Routes ,BrowserRouter} from 'react-router-dom';
import Login from './Pages/Login';
import { useEffect,useState } from 'react';

import Layout from './Admin/Layout';
import ChiefConsulant from './Admin/Users/CheifConsulant';
import Consultant from './Admin/Users/Consultants';
import MedicalOfficer from './Admin/Users/MedicalOfficer';
import ConfigureUnit from './Admin/ConfigureUnits/ConfigureUnit';
import ConfigureMOGroup from './Admin/ConfigureMOGroup/ConfigureMOGroup';
import GenerateReport from './Admin/GenerateReports/GenerateReport';
import ConsultantLeaves from './Admin/ManageLeaves/ConsultantLeaves';
import MOLeaves from './Admin/ManageLeaves/MOLeaves';
import ConsultantShitft from './Admin/ConfigureShifts/ConsultantShift';
import MOShift from './Admin/ConfigureShifts/MOShift';
import AllShift from './Admin/AllShifts';




function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for admin token in session storage on component mount
  useEffect(() => {
    const adminToken = sessionStorage.getItem('ADMIN_TOKEN');
    setIsAuthenticated(!!adminToken); // Set isAuthenticated to true if adminToken is present
  }, []);



  return (
    
    <>
  

    <BrowserRouter>
   <Routes>
    
    <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} ></Route>
    
    {isAuthenticated && (
      <>
    <Route path='/adminlayout' element={<Layout/>} ></Route>
    <Route path ='/all-shifts' element={<AllShift/>} />
    <Route path='/chief-consultant' element={<ChiefConsulant/>}/>
    <Route path='/consultant' element={<Consultant/>} />
    <Route path='/medical-officers' element={<MedicalOfficer/>} />
    <Route path='/configure-units' element={<ConfigureUnit/>} />
    <Route path='/configure-mo-group' element={<ConfigureMOGroup/>} />
    <Route path='/generate-reports' element={<GenerateReport/>} />
    <Route path='/consultant-leave' element={<ConsultantLeaves/>} />
    <Route path ='/mo-leave' element={<MOLeaves/>} />
    <Route path ='/consultant-duty' element={<ConsultantShitft/>} />
    <Route path ='/mo-duty' element={<MOShift/>} />
    <Route path='/*' element={<Login/>} ></Route>
    </>
    )}




    </Routes>

    </BrowserRouter>

    
    
    </>
  );
}

export default App;
