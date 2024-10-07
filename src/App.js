import './App.css';
import { useEffect, useState } from "react";
function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [states, setStates] = useState([])
  const [state, setState] = useState(null)
  const [cities, setCities] = useState([])
  const [city, setCity] = useState(null)

  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const res = await fetch("https://crio-location-selector.onrender.com/countries")
        if (!res.ok) throw new Error(res.status)
        const data = await res.json()
        setCountries(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCountries()

  }, [])

  const handleCountryChange = async (e) => {
    const countryName = e.target.value
    setCountry(countryName)
    try {
      const res = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
      if (!res.ok) throw new Error(res.status)
      const data = await res.json()
      setStates(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleStateChange = async (e) => {
    const stateName = e.target.value
    setState(stateName)
    try {
      const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${stateName}/cities`)
      if (!res.ok) throw new Error(res.status)
      const data = await res.json()
      setCities(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCityChange = (e) => {
    const cityName = e.target.value
    console.log(country, state, cityName)
    setCity(cityName)

  }
  return (
    <div className="App">
      <h1>Select Location</h1>
      <select onChange={handleCountryChange}>
        <option>Select Country</option>
        {countries.map((country) => <option>{country}</option>)}
      </select>

      <select disabled={country != null ? false : true} onChange={handleStateChange}>
        <option>Select State</option>
        {states.map((state) => <option>{state}</option>)}
      </select>

      <select disabled={state != null ? false : true} onChange={handleCityChange}>
        <option>Select City</option>
        {cities.map((city) => <option>{city}</option>)}</select>
      <div>{country && state && city && `You selected ${country}, ${state}, ${city}`}</div>
    </div>
  );
}

export default App;
