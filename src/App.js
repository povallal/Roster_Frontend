import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route,Routes ,BrowserRouter} from 'react-router-dom';
import Login from './Pages/Login';
import { useEffect,useState } from 'react';


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
import AllShiftAdmin from './Admin/AllShifts';

import ConsultantDuty from './Consultant/RequestDuties/ConsultantDuty';
import ConsultantLeavesRequest from './Consultant/RequestLeaves/ConsultantLeavesRequest';
import AllShiftCon from './Consultant/AllShifts';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType,setUserType]=useState("");


  useEffect(() => {
    const tokens = {
      adminToken: sessionStorage.getItem('ADMIN_TOKEN'),
      chiefConsultantToken: sessionStorage.getItem('CHIEF_CONSULTANT_TOKEN'),
      consultantToken: sessionStorage.getItem('CONSULTANT_TOKEN'),
      medicalOfficerToken: sessionStorage.getItem("MEDICAL_OFFICER_TOKEN"),
    };
    
    const tokenKeys = Object.keys(tokens);
    for (const key of tokenKeys) {
      if (tokens[key]) {
        setIsAuthenticated(true);
        // Extract the role from the key, assuming the format is ROLE_TOKEN
        const userType = key.replace('_TOKEN', '').toUpperCase();
        setUserType(userType); // Assuming you have a setUserType function to manage state
        console.log("user type",userType);
        break;
      }
    }
  }, []);
  



  return (
    
    <>
  

    <BrowserRouter>
   <Routes>
    
    <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} ></Route>
    {/* <Route path='/*' element={<Login/>} ></Route>   */}
    <Route path ='/admin-dashboard' element={<AllShiftAdmin/>} />  
    <Route path ='/consultant-dashboard' element={<AllShiftCon/>} />  
    3
            {isAuthenticated && userType === 'ADMINTOKEN' && (
              <>
                
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
                
            </>
            )}


            {isAuthenticated && userType === 'CONSULTANTTOKEN' && (
              <>
                
                <Route path='/consultant-duty-request' element={<ConsultantDuty/>} />
                <Route path='/consultant-leave-request' element={<ConsultantLeavesRequest/>} />
                
              
                
              </>
            )}





    </Routes>
 </BrowserRouter>

    
    
    </>
  );
}

export default App;
