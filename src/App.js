import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [city,setcity]= useState("Delhi");
const [weatherdata,setweatherdata]=useState(null)
const cur_date=new Date();
const months=[
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const month = months[cur_date.getMonth()];
const day=cur_date.getDate();
const year = cur_date.getFullYear();

const formatdate=`${month} ${day}, ${year}`

const API_KEY="9dde142397e6218482880cfcc8f50b42";

const feathweatherdata= async () => {
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );    
    const data=await response.json();
    console.log(data)
    setweatherdata(data)
  }catch(error){
    console.log("Error fetching weather data:", error)
  }
}

useEffect(()=>{
  feathweatherdata();
},[])




const handleinputchange = (event) => {
  setcity(event.target.value);

}

const handlesubmit = (event) => {
  event.preventDefault();
  feathweatherdata();
};

const getWeathericon = (main) => {
  switch (main) {
    case "Clear":
      return "/sun1.png"; 
    case "Rain":
      return "/rain.png"; 
    case "Snow":
      return "/icons/snowy.png";
    case "Clouds":
      return "/thunder.png";  
    case "Haze":
      return "/sun1.png"; 
    default:
      return null;
  }
};

  return (
    <div className="App">
      <div className='container'>
        {weatherdata && (

          <>
          <h1 className='container_date'>{formatdate}</h1>
          <div className='weather_data'>
          <h2 className='container_city'>{weatherdata.name}</h2>
          <img className='container_img' src={getWeathericon(weatherdata.weather[0].main)} width="130px"></img>
          <h2 className='container_degree'>{weatherdata.main.temp}</h2>
          <h2 className='country_per'>{weatherdata.weather[0].main}</h2>
          <form className='form' onSubmit={handlesubmit}>
          <input type='text' className='input' placeholder='Enter the city name' onChange={handleinputchange}></input>
          <button type='submit'>Get</button>
          </form>
          </div>
          </>
        )}
        

      </div>
    </div>
  );
}

export default App;
