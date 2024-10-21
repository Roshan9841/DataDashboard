import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'e8a14b4c4af44cca9c78b23f97b403a5';

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
      const result = await response.json();
      if (response.ok) {
        setData(prevData => [...prevData, result.data[0]]);
        setFilteredData(prevData => [...prevData, result.data[0]]);
      } else {
        setError(result.error || 'Error fetching data');
      }
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = data.filter(item => item.city_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredData(filtered);
  };

  const handleAddCity = () => {
    if (city) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleAddCity} disabled={loading}>
        {loading ? 'Fetching...' : 'Add City'}
      </button>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by city name"
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Summary Statistics</h2>
        <p>Total Cities: {filteredData.length}</p>
        <p>Average Temperature: {filteredData.reduce((acc, item) => acc + item.temp, 0) / filteredData.length} °C</p>
        <p>Number of Cities with Clear Weather: {filteredData.filter(item => item.weather.description === 'Clear').length}</p>
      </div>
      <div>
        <h2>Weather Data</h2>
        {filteredData.map(item => (
          <div key={item.city_name}>
            <h3>{item.city_name}</h3>
            <p>{item.weather.description}</p>
            <p>Temperature: {item.temp} °C</p>
            <p>Humidity: {item.rh}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;