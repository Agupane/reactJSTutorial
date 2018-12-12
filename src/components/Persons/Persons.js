import React, {PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent{

    constructor(props){
        super(props);
        console.log("[Person.js] Inside Constructor", props)
    }

    componentWillMount(){
        console.log("[Person.js] Inside componentWillMount");
    }

    componentDidMount(){
        console.log('[Person.js] Inside componentDidMount');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("[UPDATE Persons.js] Inside ReceiveProps ");
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("[UPDATE Persons.js] Inside componentWillUpdate", nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Update Persons.js] Inside componentDidUpdate");
    }




    render(){
        console.log('[Person.js] Inside Render');
        return this.props.persons.map((person,index) =>{
            return <Person
                click={ () => this.props.clicked(index) }
                name={person.name}
                position={index}
                age={person.age}
                key={person.id}
                changed={( event ) => this.props.changed(event, person.id) }/>
        });
    }
}

export default Persons;