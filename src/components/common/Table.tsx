import React from "react";
import '@/styles/common/table.css'

interface TableProps {
  tableHeaders: { key: string; label: string; width?: string }[];
  tableData: { [key: string]: string | boolean }[];
}

const Table: React.FC<TableProps> = ({ tableHeaders, tableData }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="table-header">
            {tableHeaders.map(({ label, width }, index) => (
              <th key={index} className="px-4 py-2" style={{ width }}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {tableHeaders.map(({ key }, colIndex) => (
                <td key={colIndex} className="px-4 py-4">
                  {typeof row[key] === "boolean" ? (
                    <img src={row[key] ? "/icons/tick.svg" : "/icons/cross.svg"} alt="icon" width={20} height={20} />
                  ) : (
                    row[key] || ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
