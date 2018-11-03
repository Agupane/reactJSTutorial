import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {

    state = {
        persons: [
            { id: 'asd1', name: 'Max', age: 28 },
            { id: 'asd2', name: 'Manu', age: 29 },
            { id: 'asd3', name: 'Stephanie', age: 26}
        ]
    };

    switchNameHandler = (newName) => {
      //console.log('Was clicked');
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

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({
            showPersons: !doesShow
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

      const style = {
          backgroundColor: 'green',
          color: 'white',
          font: 'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer',
          ':hover': {
              backgroundColor: 'lightgreen',
              color: 'black'
          }
      };

      let persons;

      if( this.state.showPersons ) {
          persons = (
              <div>
                  {
                      this.state.persons.map( (person, index) => {
                          return <Person
                              click={ () => this.deletePersonHandler(index) }
                              name={person.name}
                              age={person.age}
                              key={ person.id}
                          changed={ (event) => this.nameChangedHandler(event, person.id) }/>
                      })
                  }
              </div>
          );

          style.backgroundColor = 'red';
      }

      let classes = [];

      if(this.state.persons.length <= 2){
          classes.push('red'); // classes = ['red']
      }
      if(this.state.persons.length <= 1){
          classes.push('bold'); // classes = ['red', 'bold']
      }

      return(
          <StyleRoot>
              <div className="App">
                  <h1>Hi, I'm a React App</h1>
                  <p className={classes.join(' ')}>This is really working!</p>
                  <button
                      style = { style }
                      onClick={ this.togglePersonsHandler }>Show persons</button>
                  { persons }
              </div>
          </StyleRoot>
      );
  }
}

export default App;
