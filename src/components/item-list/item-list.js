import React, { Component } from 'react';

import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false,
    }

    onError = (error) => {
        this.setState({error})
    }

    componentDidMount() {
        const {getData} = this.props

        getData()
            .then(itemList => {
                this.setState({itemList})
            })
            .catch(this.onError)
    }

    renderItems(itemList) {
        return itemList.map((item) => {
            const {id} = item
            const renderValue = this.props.children(item)
            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemListSelected(id)}
                >
                    {renderValue}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state

        if (!itemList) {
            return <Spinner />
        }
        const item = this.renderItems(itemList)

        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}

const HOCWithData = () => {
    return class extends Component {

    }
}