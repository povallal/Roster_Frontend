import React from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useState,useEffect } from "react";
import axios from "axios";
import { variables } from "../apiConfig";

const ConfigureMOGroup = () => {


 // State for modal visibility
 const [showModal, setShowModal] = useState(false);
 const [groups,setGroups]= useState([]);


 useEffect(() => {
  const fetchUnits = async () => {
    try {
      const response = await axios.get(variables.API_URL +"groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  fetchUnits();
}, []);

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
          <span className="navbar-brand">Configure Mo Groups</span>
          <div className="d">
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
            <th>Group ID</th>
            <th>Group Name</th>
             <th>Created At</th>
              <th>Updated At</th>
            <th>Unit Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.Id}>

              <td>{group.Id}</td>
              <td>{group.Name}</td>
              <td>{new Date(group.CreatedAt).toLocaleDateString()}</td>
              <td>{new Date(group.UpdatedAt).toLocaleDateString()}</td>
              <td>{group.UnitName}</td>
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

      {/* Modal for adding mo groups */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Mo Group</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Add your form for adding mo groups here */}
                <form onSubmit={handleFormSubmit}>
                 <div className="mb-3">
                    <label htmlFor="groupName" className="form-label">Group Name</label>
                    <input type="text" className="form-control" id="groupName" name="groupName" required />
                 </div>
                 <div className="mb-3">
                    <label htmlFor="chiefConsultantName" className="form-label">Chief Consultant Name</label>
                    <input type="text" className="form-control" id="chiefConsultantName" name="chiefConsultantName" required />
                 </div>
                 <div className="mb-3">
                    <label htmlFor="creationDate" className="form-label">Creation Date</label>
                    <input type="date" className="form-control" id="creationDate" name="creationDate" required />
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

export default ConfigureMOGroup;