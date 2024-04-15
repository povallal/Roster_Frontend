import React from "react";
import Layout from "../Layout";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaBan } from "react-icons/fa";
import { useState ,useEffect} from "react";
import axios from "axios";
import { variables } from "../apiConfig";

const MedicalOfficer = () => {
  const[consultants,setConsultants] =useState([]);
  const [groups, setGroups] = useState([]);
  const [formData,setFormData]= useState([]);

  useEffect(() => {
    fetchGroups();
    fetchMedicalOfficers();
  }, []);
  

  const fetchMedicalOfficers= async () => {
    try {
      const response = await axios.get(variables.API_URL +"medical-officers/all-medical-officers");
      setConsultants(response.data);
      
    } catch (error) {
      console.error("Error fetching chief consultants:", error);
    }
  };


   // Fetch units data from backend and update the state
   const fetchGroups = async () => {
    try {
        const response = await fetch(variables.API_URL +"groups/all-groups");
        const data = await response.json();
        setGroups(data);
      //  console.log("Groups",data);
    } catch (error) {
        console.error("Error fetching units:", error);
    }
};
  
 // State to manage expanded details
 const [expandedId, setExpandedId] = useState(null);

 // Toggle expanded details for a specific row
 const toggleExpand = (Id) => {
    setExpandedId((prevId) => (prevId === Id ? null : Id));
 };

 // State for modal visibility
 const [showModal, setShowModal] = useState(false);

 // Function to render the actions dropdown
 const renderActionsDropdown = (Id) => {
    return (
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button className="dropdown-item" onClick={() => toggleExpand(Id)}>
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
              const  response = await axios.post(variables.API_URL +'account/medical-officer-register', formObject);

              // Check if the request was successful (status code 200-299)
              if (response.status >= 200 && response.status < 300) {
                  // Request successful, do something with the response data if needed
                  console.log('Form submitted successfully:', response.data);
                  setShowModal(false);
                  fetchMedicalOfficers();
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
          <span className="navbar-brand">MedicalOfficers</span>
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
            <th>Group Name</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant) => (
            <React.Fragment key={consultant.Id}>
              {/* Main row with basic details */}
              <tr key={consultant.Id}>

              <td>{consultant.UserName}</td>
                <td>{consultant.Email}</td>
                <td>{new Date(consultant.CreatedAt).toLocaleDateString()}</td>
                <td>{new Date(consultant.UpdatedAt).toLocaleDateString()}</td>
               <td>{consultant.IsActive ? "Yes" : "No"}</td>
                <td>{consultant.GroupName}</td>
                <td>{renderActionsDropdown(consultant.Id)}</td>
              </tr>

              {/* Expanded row with additional details */}
              {expandedId === consultant.Id && (
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
                <h5 className="modal-title">Add MedicalOfficer</h5>
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
                <label htmlFor="group" className="form-label">Group</label>
                <select className="form-control" id="group" name="groupId" required >
                    <option value="">Select Group</option>
                    {groups.map((group) => (
            <option key={group.Id} value={group.Id}>{group.Name} </option>
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

export default MedicalOfficer;