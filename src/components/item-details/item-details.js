import React, { Component } from 'react';

import './item-details.css';
import Spinner from "../spinner";
import ErrorButton from "../UI/error-button";

function Record({item, field, label}) {
  return (
      <li className="list-group-item">
        <span className="term">{label}:</span>
        <span>{item[field]}</span>
      </li>
  )
}
export {
  Record
}
export default class ItemDetails extends Component {

  state = {
    item: null,
    error: false,
    loading: false,
    imageUrl: null
  }

  onError = (error) => {
      this.setState({
        error,
        loading: false
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idPerson !== prevProps.idPerson) {
      this.updatePerson()
    }
  }

  componentDidMount() {
    this.updatePerson()
  }

  updatePerson() {
    const {idPerson, getData} = this.props
    if (!idPerson) {
      return
    }
    this.setState({loading: true})
    getData(idPerson)
        .then(item => {
          this.setState({
            item,
            loading: false,
            image: this.props.getImage(idPerson)
          })
        })
        .catch(this.onError)
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }
    if (!this.state.item) {
      return <span>Choose item from list</span>
    }
    const {image, item} = this.state
    console.log(item)
    return (
      <div className="person-details card mt-0">
        <img className="person-image"
          src={image} alt="Details for some person" />
        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child, idx) => {
              return React.cloneElement(child, {item})
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
