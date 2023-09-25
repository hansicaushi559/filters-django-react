import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const apiUrl = "http://127.0.0.1:8000/api/";
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [category, setCategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            search: query,
            ordering: orderBy,
            category: category,
            age_range: ageRange,
          },
        });
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
        setData(response.data.results);
        setCurrentPage(1);
        setTotalPages(Math.ceil(response.data.count / 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, category, orderBy, ageRange]);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  
  const handlePageClick = async (pageNumber) => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          search: query,
          ordering: orderBy,
          category: category,
          age_range: ageRange,
          page: pageNumber, // Set the page number
        },
      });
      setPrevUrl(response.data.previous);
      setNextUrl(response.data.next);
      setData(response.data.results);
      setCurrentPage(pageNumber); // Update the current page number
    } catch (error) {
      console.log("Error fetching page data:", error);
    }
  };


  const handleNextPage = async () => {
    if (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        setData(response.data.results);
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
      } catch (error) {
        console.log("Error fetching next page data:", error);
      }
    }
  };

  const handlePrevPage = async () => {
    if (prevUrl) {
      try {
        const response = await axios.get(prevUrl);
        setData(response.data.results);
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
      } catch (error) {
        console.log("Error fetching previous page data:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleOrder = (orderingField) => {
    setOrderBy(orderingField);
  };


  return (
    <div className="App">
      <h3>All The Employees</h3>
      <br />
      <input
        type="text"
        placeholder="Search ..."
        className="searchBar"
        value={query}
        onChange={handleSearch}
      />
      <br />
      <br />
      <div>
        <button onClick={() => handleOrder("name")}>
          Order by Name (A to Z)
        </button>
        <button onClick={() => handleOrder("-name")}>
          Order by Name (Z to A)
        </button>
      </div>

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="Testing">Testing</option>
      </select>

      <label>Age Range:</label>
      <input
        type="number"
        value={ageRange}
        onChange={(e) => setAgeRange(e.target.value)}
        min="0"
      />

      <ul className="employee-list">
        {data.map((employee) => (
          <li key={employee.id}>
            {employee.name}
          </li>
        ))}
      </ul>

      <div className="pb">
        <ul className="paggination">
          {prevUrl && (
            <li className="page-button">
              <button onClick={handlePrevPage}>Previews</button>
            </li>
          )}

          {generatePageNumbers().map((pageNumber) => (
            <li key={pageNumber} className="page-button">
              <button
                onClick={() => handlePageClick(pageNumber)}
                className={pageNumber === currentPage ? "active" : ""}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          {nextUrl && (
            <li className="page-button">
              <button onClick={handleNextPage}>Next</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
