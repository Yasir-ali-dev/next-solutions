import React from "react";
import { Image } from "react-bootstrap";

const TableHeadComponent = ({
  placeholder,
  setSearch,
  handleSearch,
  setRender,
  data,
  headings,
  colSpan,
}) => {
  return (
    <thead>
      <tr>
        <th colSpan={colSpan}>
          <div className="d-flex justify-content-center gap-1">
            <input
              placeholder={`Search by ${placeholder}`}
              className="form-field w-100 py-1 px-1"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="search"
            ></input>
            <button className="search-button-style" onClick={handleSearch}>
              <Image src={`/employees/search.png`} />
            </button>
          </div>
        </th>
        <th colSpan={2}>
          <button
            className="ms-auto router-link-btn btn-custom"
            onClick={() => setRender(data)}
          >
            Reset
          </button>
        </th>
      </tr>
      <tr>
        {headings.map((_, index) => (
          <th key={index}>{_}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadComponent;
