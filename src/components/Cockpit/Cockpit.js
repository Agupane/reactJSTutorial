import React from 'react';
import classes from './Cockpit.module.css';


const cockpit = (props) => {
    let assignedClasses = [];
    let btnClass = classes.button;
    if(props.showPersons){
        btnClass = [classes.button,classes.red].join(' ');
    }
    if(props.persons.length <= 2){
        assignedClasses.push( classes.red ); // classes = ['red']
    }
    if(props.persons.length <= 1){
        assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }


  return (
      <>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
            className={ btnClass }
            onClick={ props.clicked }>Show persons
        </button>
        <button onClick={props.login}>Log in</button>
      </>
  );
};

export default cockpit;