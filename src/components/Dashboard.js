import React, {useState} from 'react'
import SearchFilter from './SearchFilter';
import axios from 'axios';

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [newData, setNewData] = useState({ name: '', email: '', age: '', date: '' });
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/upload', formData);
      console.log('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const handleFileRead = async (e) => {
   
    const file = e.file;
  
    const formData = new FormData();
    formData.append('file', file);
   


    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
      setMessage('An error occurred while fetching data');
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setMessage('Data created successfully');
        setNewData({ name: '', email: '', age: '', date: '' });
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setMessage('Data updated successfully');
        setNewData({ name: '', email: '', age: '', date: '' });
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Data deleted successfully');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      setMessage('An error occurred while downloading data');
    }
  };

  return (
    <div>
      <h2>Data Upload</h2>
      <div>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
      <p>{message}</p>

      <h2>Data Dashboard</h2>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={handleDownload}>Download Data</button>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => handleUpdate(item._id)}>Update</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}

      <h2>Create Data</h2>
      <input
        type="text"
        placeholder="Name"
        value={newData.name}
        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newData.email}
        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newData.age}
        onChange={(e) => setNewData({ ...newData, age: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date"
        value={newData.date}
        onChange={(e) => setNewData({ ...newData, date: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>

        <SearchFilter/>
    </div>
  )
}

export default Dashboard
