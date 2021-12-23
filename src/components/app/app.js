import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ItemDetails from '../item-details';

import './app.css';
import WarningButton from "../UI/warning-button";
import {logRoles} from "@testing-library/react";
import ErrorButton from "../UI/error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";
import Row from '../UI/row';
import SwapiService from "../../services/swapi-service";
import ErrorBoundary from "../UI/error-boundary";
import {Record} from "../item-details/item-details";

export default class App extends Component {
    swapi = new SwapiService()
    state = {
        showRandom: true,
        hasError: false
    }

    onShowRandom = () => {
        this.setState(({showRandom}) => {
            return {
                showRandom: !showRandom
            }
        })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        const {showRandom, idPerson} = this.state
        const showRandomContent = showRandom ? <RandomPlanet /> : null
        const { getPlanet,
                getPerson,
                getPersonImage,
                getPlanetImage} = this.swapi
        const starshipDetail = (
            <ItemDetails idPerson={5}
                         getData={getPerson}
                         getImage={getPersonImage}>
                <Record field={'name'} label={'Name'} />
                <Record field={'gender'} label={'Gender'} />
                <Record field={'birthYear'} label={'Birth Year'} />
            </ItemDetails>
        )
        const planetDetail = (
            <ItemDetails idPerson={3}
                         getData={getPlanet}
                         getImage={getPlanetImage}>
                <Record field={'population'} label={'Population'} />
                <Record field={'rotationPeriod'} label={'Rotation Period'} />
                <Record field={'diameter'} label={'Diameter'} />
            </ItemDetails>
        )
        return (
            <div>
                <ErrorBoundary>
                    <Header />
                    {/*{showRandomContent}*/}
                    {/*<WarningButton onClick={this.onShowRandom} label='Toggle random component' />*/}
                    {/*<ErrorButton />*/}
                    {/*<PeoplePage />*/}
                    {/*<Row left={starshipDetail} right={planetDetail} />*/}

                </ErrorBoundary>
            </div>
        );
    }
};