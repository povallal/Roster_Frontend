import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { variables } from "../apiConfig";


const ConfigureUnit = () => {

  const [units, setUnits] = useState([]);


  useEffect(() => {
    fetchUnits();


  }, []);


    const fetchUnits = async () => {
      try {
        const response = await axios.get(variables.API_URL +"units/all-units");
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

   





  const renderActionsDropdown = (Id) => {
   // console.log("Unit Id",Id)
          return(
        <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a className="dropdown-item" href="#"><FaEdit /> Edit</a></li>
          <li><a className="dropdown-item" href="#"><FaTrash /> Delete</a></li>
        </ul>
      </div>
          )
  };

   // State for modal visibility
 const [showModal, setShowModal] = useState(false);

 // Function to handle the click event of the Add button
 const handleAddButtonClick = () => {
    setShowModal(true);
 };



 const handleFormSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    // Make an HTTP POST request to your backend API endpoint
    const response = await axios.post(variables.API_URL +'units/create', formObject);

    // Check if the request was successful
    if (response.status === 200) {
      // Request successful, do something with the response data if needed
      console.log('Unit created successfully:', response.data);
      setShowModal(false);
      fetchUnits();
    } else {
      // Request was not successful, handle error
      console.error('Error:', response.statusText);
      // Handle error, show error message to the user, etc.
    }
  } catch (error) {
    // An error occurred while making the request
    console.error('Error:', error.message);
    // Handle error, show error message to the user, etc.
  }
};



  return (
    <Layout>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Configure Units</span>
          <div className="d-flex">
          <button className="btn btn-outline-success" type="button" onClick={handleAddButtonClick}>
            <FaPlus /> 
          </button> 
          </div> 
        </div>
      </nav>

      {/* Table */}
      <table className="table mt-3">
        <thead>
         <tr>
              <th>ID</th>
              <th>Unit Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              {/* <th>Chief Consultant</th> */}
              <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.Id}>
            
                <td>{unit.Id}</td>
                <td>{unit.Name}</td>
                <td>{new Date(unit.CreatedAt).toLocaleDateString()}</td>
                <td>{new Date(unit.UpdatedAt).toLocaleDateString()}</td>
                {/* <td>{unit.ChiefConsultantName}</td> */}
                <td>{renderActionsDropdown(unit.Id)}</td>

              <td>
            
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding units */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Unit</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Add your form for adding units here */}
                <form onSubmit={handleFormSubmit}>
                 <div className="mb-3">
                    <label htmlFor="unitName" className="form-label">Unit Name</label>
                    <input type="text" className="form-control" id="unitName" name="name" required />
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

export default ConfigureUnit;