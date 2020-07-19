import React from "react";

function Table({ children }) {
  return (
    <div className="ar-snippet-preview mb-5">
      <div className="table-container">
        <table className="table is-narrow is-hoverable">{children}</table>
      </div>
    </div>
  );
}

export default Table;
