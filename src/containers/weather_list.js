import React, {Component} from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import GoogleMap from '../components/google_maps';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temp = cityData.list.map(weather => weather.main.temp);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const { lat, lon } = cityData.city.coord;
        return (
            <tr key={name}>
                <td><GoogleMap lat={lat} lon={lon} /></td>
                <td><Chart data={temp} color="orange" units="K"/></td>
                <td><Chart data={humidity} color="blue" units="hPa"/></td>
                <td><Chart data={pressure} color="black" units="%"/></td>
            </tr>
        )
    }
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);