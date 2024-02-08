import React from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const ConfigureUnit = () => {
 // Dummy data for the table
 const units = [
    { id: "EDX", name: "Unit 1", chiefConsultantName: "Consultant 1" },
    { id: "RMX", name: "Unit 2", chiefConsultantName: "Consultant 2" },
    { id: "ZSQ", name: "Unit 3", chiefConsultantName: "Consultant 3" },
    // Add more dummy data as needed
 ];

 // State for modal visibility
 const [showModal, setShowModal] = useState(false);

 // Function to handle the click event of the Add button
 const handleAddButtonClick = () => {
    setShowModal(true);
 };

 // Function to handle the submission of the form
 const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get the form data from the event
    const formData = new FormData(e.target);

    // Do something with the form data (e.g., send it to an API)
    console.log("Form data:", Object.fromEntries(formData.entries()));

    // Close the modal
    setShowModal(false);
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
            <th>Unit ID</th>
            <th>Unit Name</th>
            <th>Chief Consultant Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.id}</td>
              <td>{unit.name}</td>
              <td>{unit.chiefConsultantName}</td>
              <td>
              <div className="dropdown">
                 <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                 </button>
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#"><FaEdit /> Edit</a></li>
                    <li><a className="dropdown-item" href="#"><FaTrash /> Delete</a></li>
                 </ul>
                </div>
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
                    <input type="text" className="form-control" id="unitName" name="unitName" required />
                 </div>
                 <div className="mb-3">
                    <label htmlFor="unitId" className="form-label">Unit ID</label>
                    <input type="text" className="form-control" id="unitId" name="unitId" required />
                 </div>
                 <div className="mb-3">
                    <label htmlFor="chiefConsultantName" className="form-label">Chief Consultant Name</label>
                    <input type="text" className="form-control" id="chiefConsultantName" name="chiefConsultantName" required />
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