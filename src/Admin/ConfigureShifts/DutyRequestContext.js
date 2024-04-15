// DutyRequestContext.js
import React from 'react';

const DutyRequestContext = React.createContext({
  handleRequestUpdate: () => {},
  // any other shared state or functions
});

export default DutyRequestContext;
