import React from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaBan } from "react-icons/fa";
import { useState ,useEffect} from "react";
import axios from "axios";
import { variables } from "../apiConfig";

const Consultant = () => {
 


 // State for modal visibility
 const[consultants,setConsultants] =useState([]);
 const [showModal, setShowModal] = useState(false);

 useEffect(() => {
  fetchConsultants();
}, []);

const fetchConsultants = async () => {
  try {
    const response = await axios.get(variables.API_URL +"consultants/consultants");
    setConsultants(response.data);
    
  } catch (error) {
    console.error("Error fetching chief consultants:", error);
  }
};


 // Function to render the actions dropdown
 const renderActionsDropdown = (Id) => {
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
          {consultants.map((consultant) => (

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