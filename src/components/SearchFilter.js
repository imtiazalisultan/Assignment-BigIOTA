import React, {useState} from 'react'

const SearchFilter = () => {

  const [searchName,setSearchName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

    const handleSearch = async (name) => {
        try {
          const response = await fetch(`/api/data/search?name=${name}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.log(error);
          setMessage('An error occurred while searching data');
        }
      };
      
      const handleFilter = async (startDate, endDate) => {
        try {
          const response = await fetch(`/api/data/filter?startDate=${startDate}&endDate=${endDate}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.log(error);
          setMessage('An error occurred while filtering data');
        }
      };
      
  return (
    <div>
       <h2>Search Data by Name</h2>
    <input type="text" placeholder="Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
    <button onClick={() => handleSearch(searchName)}>Search</button>

    <h2>Filter Data by Date Range</h2>
    <input
      type="date"
      placeholder="Start Date"
      value={filterStartDate}
      onChange={(e) => setFilterStartDate(e.target.value)}
    />
    <input
      type="date"
      placeholder="End Date"
      value={filterEndDate}
      onChange={(e) => setFilterEndDate(e.target.value)}
    />
    <button onClick={() => handleFilter(filterStartDate, filterEndDate)}>Filter</button>
    </div>
  )
}

export default SearchFilter
