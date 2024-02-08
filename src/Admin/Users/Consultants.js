import React from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaBan } from "react-icons/fa";
import { useState } from "react";


const Consultant = () => {
 // Dummy data for the table
 const consultants = [
    { id: "EDX", name: "Consultant 1", phoneno: "0772497273", email: "edx@gmail.com" ,unit :"ICC1"},
    { id: "RMX", name: "Consultant 2", phoneno: "0772497273", email: "edx@gmail.com",unit :"ICC2" },
    { id: "ZSQ", name: "Consultant 3", phoneno: "0772497273", email: "edx@gmail.com",unit :"ICC3" },
    // Add more dummy data as needed
 ];

 // State to manage expanded details
 const [expandedId, setExpandedId] = useState(null);

 // Toggle expanded details for a specific row
 const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
 };

 // State for modal visibility
 const [showModal, setShowModal] = useState(false);

 // Function to render the actions dropdown
 const renderActionsDropdown = (id) => {
    return (
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button className="dropdown-item" onClick={() => toggleExpand(id)}>
              Details
            </button>
          </li>
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
          <span className="navbar-brand">Consultants</span>
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
            <th>ID</th>
            <th>Name</th>
            <th>PhoneNo</th>
            <th>Email</th>
            <th>Unit</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant) => (
            <React.Fragment key={consultant.id}>
              {/* Main row with basic details */}
              <tr>
                <td>{consultant.id}</td>
                <td>{consultant.name}</td>
                <td>{consultant.phoneno}</td>
                <td>{consultant.email}</td>
                <td>{consultant.unit}</td>
                <td>{renderActionsDropdown(consultant.id)}</td>
              </tr>

              {/* Expanded row with additional details */}
              {expandedId === consultant.id && (
                <tr>
                 <td colSpan="5">
                    {/* Additional details go here */}
                    <div>
                      <strong>Additional Details:</strong>
                      {/* Add more details here */}
                    </div>
                 </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

       {/* Modal for adding chief consultants */}
       {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Consultant</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Add your form for adding chief consultants here */}
                <form onSubmit={handleFormSubmit}>
                 <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                 </div>
                 <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone No</label>
                    <input type="text" className="form-control" id="phone" name="phone" required />
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
                    <label htmlFor="idno" className="form-label">ID No</label>
                    <input type="text" className="form-control" id="idno" name="idno" required />
                 </div>
                 <div className="mb-3">
                    <label htmlFor="unit" className="form-label">Unit</label>
                    <input type="text" className="form-control" id="unit" name="unit" required />
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

export default Consultant;