import React, { Component } from 'react';

import './item-list.css';
import HOCWithData from "../hoc-helpers";
import itemList from "./index";
import SwapiService from "../../services/swapi-service";

const ItemList = (props) => {
    const {data, onItemListSelected, children: renderLabel} = props

    const renderItems = (data) => {
        return data.map((item) => {
            const {id} = item
            const renderValue = renderLabel(item)
            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => onItemListSelected(id)}
                >
                    {renderValue}
                </li>
            )
        })
    }

    const item = renderItems(data)
    return (
        <ul className="item-list list-group">
            {item}
        </ul>
    );
}
const {getAllPeople} = new SwapiService()

export default ItemList