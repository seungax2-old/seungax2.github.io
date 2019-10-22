import React, {Component} from 'react';
import Child from './Child';

class Parent extends Component {
    render(){
        const name = 'dohee';

        return(
            <Child data={name}></Child>
        )
    }
}

export default Parent;