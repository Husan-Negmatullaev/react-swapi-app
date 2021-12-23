import React, {Component} from 'react';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import Row from '../UI/row';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from "../UI/error-boundary";

export default class PeoplePage extends Component {

    swapi = new SwapiService()

    state = {
        idPerson: null,
        hasError: false
    }

    onPersonSelected = (id) => {
        this.setState({
            idPerson: id
        })
    }

    render() {
        const {getAllPeople, getPerson} = this.swapi
        const {idPerson} = this.state
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        const itemList = (
            <ItemList getData={getAllPeople}
                      onItemListSelected={this.onPersonSelected}
                      renderFunction={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}>
                {(i) => {
                    return `${i.name} (${i.gender}, ${i.birthYear})`
                }}
            </ItemList>
        )
        const itemDetails = (
            <ErrorBoundary>
                <ItemDetails getData={getPerson}
                             idPerson={idPerson}/>
            </ErrorBoundary>
        )
        return (
            <Row left={itemList} right={itemDetails} />
        );
    }
}