import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Detailview() {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'e8a14b4c4af44cca9c78b23f97b403a5';

  useEffect(() => {
    const fetchCityData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${apiKey}`);
        const result = await response.json();
        if (response.ok) {
          setCityData(result.data[0]);
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

    fetchCityData();
  }, [cityName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="Detailview">
      {cityData && (
        <div>
          <h2>{cityData.city_name}</h2>
          <p>{cityData.weather.description}</p>
          <p>Temperature: {cityData.temp} °C</p>
          <p>Humidity: {cityData.rh}%</p>
          <p>Wind Speed: {cityData.wind_spd} m/s</p>
          <p>Pressure: {cityData.pres} mb</p>
        </div>
      )}
    </div>
  );
}

export default Detailview;