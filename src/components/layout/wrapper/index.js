import React from 'react';

export const AppWrapper = ({ children }) => {
  return <div className="app-wrapper d-flex justify-content-center align-items-center">
    <div className="app-content d-flex align-items-end">
      {
        children
      }
    </div>
  </div>
};