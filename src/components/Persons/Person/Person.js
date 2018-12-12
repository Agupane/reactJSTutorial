import React, {Component} from 'react';
import classes from './Person.module.css'
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';

class Person extends Component {


    componentDidMount() {
        console.log("[Person.js] Inside componentDidMount()");
        if(this.props.position === 0) {
            this.inputElement.focus();
        }
    }


    render(){
        return (
            <>
                <p onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old</p>
                <p>{ this.props.children }</p>
                <input
                    type="text"
                    onChange={ this.props.changed }
                    value={ this.props.name }
                    ref={(inp) =>{ this.inputElement = inp }}
                />
            </>
    )}
}


Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};
export default withClass(Person, classes.Person);