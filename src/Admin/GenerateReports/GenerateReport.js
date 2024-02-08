import React from "react";
import Layout from "../Layout";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./GenerateReport.css";

const GenerateReport = () => {
  // Dummy data for units selection
  const units = [
    { id: "1", name: "Unit 1" },
    { id: "2", name: "Unit 2" },
    { id: "3", name: "Unit 3" },
    // Add more dummy data as needed
  ];

  // Function to handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get the form data from the event
    const formData = new FormData(e.target);

    // Do something with the form data (e.g., send it to an API)
    console.log("Form data:", Object.fromEntries(formData.entries()));
  };

  return (
    <Layout>
      {/* Form for generating reports */}
      <div className="container">
        <h4 className="mt-4 mb-4">Generate Report</h4>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="unit" className="form-label">
              Unit
            </label>
            <select className="form-select" id="unit" name="unit" required>
              <option value="">Select a unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="datePeriod" className="form-label">
              Date Period
            </label>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fromDate" className="form-label">
                  From
                </label>
                <input type="date" className="form-control" id="fromDate" name="fromDate" required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="toDate" className="form-label">
                  To
                </label>
                <input type="date" className="form-control" id="toDate" name="toDate" required />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Generate Report
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default GenerateReport;
