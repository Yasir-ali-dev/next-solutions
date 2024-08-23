import React from "react";

const TableLength = ({ colSpan, length }) => {
  return (
    <tr>
      <td className="text-end  px-5" colSpan={colSpan}>
        <strong>Total {length}</strong>
      </td>
    </tr>
  );
};

export default TableLength;
