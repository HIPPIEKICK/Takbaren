import { useState, useEffect } from 'react';
import ReactWeather from 'react-open-weather';
import { API } from '../utils/API';
import { round } from '../utils/helpers';
// import styled from 'styled-components';
// import { render } from 'react-dom';
// import axios from 'axios';
// import sun from '../assets/sun.png';

//Från gammal väder app
// const WeatherApp = () => {
// 	const [weather, setWeather] = useState();
// 	const [latlng] = useState({
// 		lat: 57.64188017795392,
// 		lng: 18.292565198468033,
// 	});
// 	const [temperature, setTemperature] = useState(0);
// 	const [icon, setIcon] = useState('');

// 	const fetchWeather = async () => {
// 		const res = await axios.get({ API });
// 		setTemperature(res.data.current.temp);
// 		setWeather(res.data.current.weather[0].main);
// 		setIcon(res.data.current.weather[0].icon);
// 	};

// 	useEffect(() => {
// 		fetchWeather();
// 	}, [latlng]);
// 	return (
// 		<section>
// 			<p>{round(temperature)} °C</p>
// 			<p>{weather}</p>
// 			<Img src={sun} />

// 			{weather === 'Sunny' && <p>It's sunny on the roof top! </p>}
// 			{weather === 'Rain' && (
// 				<p>It's raining, check our instagram to see if we're open </p>
// 			)}
// 			{weather === 'Clouds' && <p>Cloudy day, perfect for a roof top drink</p>}
// 		</section>
// 	);
// };
// export default WeatherApp;

// const Img = styled.img`
// 	width: 100%;
// `;

const customStyles = {
  fontFamily: 'Playfair Display, serif',
	gradientStart:  '#00FFFFFF',
	gradientMid:  '#00FFFFFF',
	gradientEnd:  '#00FFFFFF',
	locationFontColor:  '#000000',
	todayTempFontColor:  '#000000',
	todayDateFontColor:  '#B5DEF4',
	todayRangeFontColor:  '#B5DEF4',
	todayDescFontColor:  '#B5DEF4',
	todayInfoFontColor:  '#B5DEF4',
	todayIconColor:  '#FFF',
	forecastBackgroundColor:  '#FFF',
	forecastSeparatorColor:  '#DDD',
	forecastDateColor:  '#777',
	forecastDescColor:  '#777',
	forecastRangeColor:  '#777',
	forecastIconColor:  '#4BC4F7',
};

////////////**********************'/////////////////////////// */
//Gammalt som inte funkade att styla från https://www.npmjs.com/package/react-open-weather
export const _getWeather = (_API) => async (lat, lon) => {
	const weather = await _API.getCurrentWeather(lat, lon);

	if (!weather) return;

	return {
		icon: weather.weather[0].icon,
		data: {
			// cityName: weather.name,

			data: {
				forecast: [],
				current: {
					// date: new Date().toDateString(),
					description: weather.weather[0].description,
					temperature: {
						current: round(weather.main.temp - 273.15, 1),
						// min: round(weather.main.temp_min - 273.15, 1),
						// max: round(weather.main.temp_max - 273.15, 1),
					},
					// wind: weather.wind.speed,
					// humidity: weather.main.humidity,
				},
			},
		},
	};
};

const getWeather = _getWeather(API);

export default function WeatherApp() {
	const [weather, setWeather] = useState();
	const [latLng] = useState({
		lat: 57.64188017795392,
		lng: 18.292565198468033,
	});
	const [icon, setIcon] = useState();

	const updateWeather = async (lat, lng) => {
		const { icon, data } = await getWeather(lat, lng);
		setWeather(data);
		setIcon(icon);
	};

	useEffect(() => {
		updateWeather(latLng.lat, latLng.lng);
	}, [latLng]);

	return weather ? (
				<ReactWeather
					className='weather'
					theme={customStyles}
					isLoading={false}
					data={weather.data}
					lang='en'
					// locationLabel={weather.cityName}
					// unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
				/>
	) : null;
}
