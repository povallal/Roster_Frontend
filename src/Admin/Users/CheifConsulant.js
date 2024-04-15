import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaBan } from "react-icons/fa";
import axios from "axios";
import { variables } from "../apiConfig";

const ChiefConsulant = () => {
  const [chiefConsultants, setChiefConsultants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [units, setUnits] = useState([]);

  useEffect(() => {
   
    fetchUnits();
    fetchChiefConsultants();
  }, []);

  
  const fetchChiefConsultants = async () => {
    try {
      const response = await axios.get(variables.API_URL +"chief-consultants/all-chief-consultants");
      setChiefConsultants(response.data);
      // console.log("all-chief-consultants",response.data);
      
    } catch (error) {
      console.error("Error fetching chief consultants:", error);
    }
  };
  



    // Fetch units data from backend and update the state
    const fetchUnits = async () => {
        try {
            const response = await fetch(variables.API_URL +"units/all-units");
            const data = await response.json();
            setUnits(data);
           // console.log("units",data);
        } catch (error) {
            console.error("Error fetching units:", error);
        }
    };

   



  const renderActionsDropdown = (Id) => {

   // console.log("Users Id",Id);
    return (
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button className="dropdown-item">
              <FaEdit /> Edit
            </button>
          </li>
          <li>
            <button className="dropdown-item">
              <FaTrash /> Delete
            </button>
          </li>
          <li>
            <button className="dropdown-item">
              <FaBan /> Deactivate
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };


   // Function to handle the submission of the form
 const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Get the form data from the event
  const formData = new FormData(e.target);

  const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        console.log("form object ",formObject);

        try {
          // Make an HTTP POST request to your backend API endpoint
          const  response = await axios.post(variables.API_URL +'account/chief-consultant-register', formObject);
  
          // Check if the request was successful (status code 200-299)
          if (response.status >= 200 && response.status < 300) {
              // Request successful, do something with the response data if needed
              console.log('Form submitted successfully:', response.data);
              setShowModal(false);
              fetchChiefConsultants();
          } else {
              // Request was not successful, handle error
              console.error('Error:', response.statusText);
              // Handle error, show error message to the user, etc.
          }
      } catch (error) {
          // An error occurred while making the request (e.g., network error)
          console.error('Error:', error.message);
          // Handle error, show error message to the user, etc.
      }


};


  return (
    <Layout>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Chief Consultants</span>
          <div className="d-flex">
            <button className="btn btn-outline-success me-2" type="button" onClick={handleAddButtonClick}>
              <FaPlus />
            </button>
            <button className="btn btn-outline-secondary" type="button">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </nav>

      {/* Table */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Active</th>
            <th>Unit Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chiefConsultants.map((consultant) => (
            <tr key={consultant.Id}>

              <td>{consultant.UserName}</td>
              <td>{consultant.Email}</td>
              <td>{new Date(consultant.CreatedAt).toLocaleDateString()}</td>
              <td>{new Date(consultant.UpdatedAt).toLocaleDateString()}</td>
              <td>{consultant.IsActive ? "Yes" : "No"}</td>
              <td>{consultant.UnitName}</td>
              <td>{renderActionsDropdown(consultant.Id)}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* Modal for adding chief consultants */}
       {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Chief Consultant</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Add your form for adding chief consultants here */}
                <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="userName" name="userName" required />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" required />
        </div>
        <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required />
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="isActive" name="isActive" value="true" />
            <label className="form-check-label" htmlFor="isActive">Active</label>
        </div>
        <div className="mb-3">
            <label htmlFor="unit" className="form-label">Unit</label>
            <select className="form-control" id="unit" name="unitId" required>
                <option value="">Select Unit</option>
                {units.map((unit) => (
                    <option key={unit.Id} value={unit.Id}>{unit.Name}</option>
                ))}
            </select>
        </div>


        <button type="submit" className="btn btn-primary">Submit</button>
    </form>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                 Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </Layout> 
  );
};

export default ChiefConsulant;
