import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {
  swapi = new SwapiService()

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePlanet()
    this.interval = setInterval(this.updatePlanet, 2500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    })
  }

  onError = (error) => {
    this.setState({
      error,
      loading: false
    })
  }

  updatePlanet = () => {
    console.log('Update')
    const id = Math.floor(Math.random() * 10) + 2
    this.swapi
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
  }

  render() {

    const { planet, loading, error } = this.state

    const hasData = !(loading || error)
    const sendError = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet={planet} /> : null

    return (
      <div className="random-planet jumbotron rounded">
        {sendError}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {

  const {population, rotationPeriod, diameter, name, id} = planet

  return <React.Fragment>
    <img className="planet-image"
         src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Space Planet" />
    <div>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{population}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation Period</span>
          <span>{rotationPeriod}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{diameter}</span>
        </li>
      </ul>
    </div>
  </React.Fragment>
}