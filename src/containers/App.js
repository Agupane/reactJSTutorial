import React, { PureComponent } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import classes from './App.module.css';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

    constructor(props){
        super(props);
        console.log("[App.js] Inside Constructor", props);
    }

    componentWillMount(){
        console.log("[App.js] Inside componentWillMount");
    }

    componentDidMount(){
        console.log('[App.js] Inside componentDidMount');
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("[UPDATE App.js] Inside componentWillUpdate", nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Update App.js] Inside componentDidUpdate");
    }


    state = {
        persons: [
            { id: 'asd1', name: 'Max', age: 28 },
            { id: 'asd2', name: 'Manu', age: 29 },
            { id: 'asd3', name: 'Stephanie', age: 26}
        ],
        showPersons: false,
        toggleClickCounter: 0,
        authenticated: false
    };

    switchNameHandler = (newName) => {

        this.setState({
            persons: [
            { name: newName, age: 28 },
            { name: 'Manu', age: 29 },
            { name: 'Stephanie', age: 27}
        ]})
    };

    nameChangedHandler = (event, personId) => {
        const personIndex = this.state.persons.findIndex(
            p => {
                return p.id === personId;
            }
        );
        /** We take the object and not the reference **/
        const person = {
            ...this.state.persons[personIndex]
        };
        /** Another way **/
        // const person = Object.assign( {}, this.state.persons[personIndex]);

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});
    };

    loginHandler = () =>{
        this.setState({
            authenticated: true
        });
    };

    togglePersonsHandler = () => {
        console.log("Show persons: ", this.state.showPersons);
        const doesShow = this.state.showPersons;
        this.setState((prevState,props) =>{
            return {
                showPersons: !doesShow,
                toggleClickCounter: prevState.toggleClickCounter + 1
            }
        });
    };


    deletePersonHandler = (personIndex) => {
        /** If we use .slice() we get a copy of the object, and not the reference **/
        const persons = this.state.persons.slice();
        /** The same thing, we get a copy of the object and not the reference **/
        const persons2 = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState({
            persons: persons
        });
    };

  render() {
      console.log("[App.js] Inside render");
      let persons;

      console.log("App classes ", classes);
      if( this.state.showPersons ) {
          persons = (
              <div>
                  <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                  />
              </div>
          );
      }

      return(
          <>
              <button onClick={() => {this.setState({showPersons:true})}}>Show Persons</button>
              <Cockpit
                showPersons={this.state.showPersons}
                persons={this.state.persons}
                clicked={this.togglePersonsHandler}
                login={this.loginHandler}/>
              <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
          </>
      //    <div className={classes.app}>

      //    </div>
      );
  }
}

export default withClass(App, classes.app);
