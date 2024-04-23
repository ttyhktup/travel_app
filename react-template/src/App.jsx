import React, { useState } from 'react';

const apiUrl = 'http://localhost:5000'; // Update the URL with your actual backend URL

const fetchData = async () => {
    try {
        const response = await fetch(`${apiUrl}/try`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle CORS-related errors here
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            // Handle CORS error (e.g., display an error message to the user)
            console.error('CORS error: Failed to fetch data due to CORS policy.');
        }
        return null; // Return null or handle the error as needed
    }
};

const App = () => {
  const [fetchedData, setFetchedData] = useState('');

  const handleFetchData = async () => {
    const data = await fetchData(); // Fetch data when the function is called
    if (data !== null) 
    {
      setFetchedData(data); // Update state with the fetched data
    }
  };

  // Call handleFetchData when the component mounts
  // You can also trigger this function in response to user actions or events
  handleFetchData();

  return (
    <div>
      <h1>Data Fetched from Backend</h1>
      <p>{fetchedData}</p> {/* Display fetched data */}
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById('root'));

export default App;