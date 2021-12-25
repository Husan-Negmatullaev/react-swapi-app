import Spinner from "../spinner";
import {Component} from "react";

const HOCWithData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
            error: false,
        }

        onError = (error) => {
            this.setState({error})
        }

        componentDidMount() {
            getData()
                .then(data => {
                    this.setState({data})
                })
            .catch(this.onError)
        }

        render() {
            console.log('Props HOC', this.props)
            const {data} = this.state
            if (!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data} />
        }
    }
}

export default HOCWithData