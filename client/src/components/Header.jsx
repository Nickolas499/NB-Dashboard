import React from 'react'
import {Dropdown} from './Dropdown'
export const Header = (props) => {
const fname = "Monica"
const lname = "Lopez"
  const Username = fname+" "+ lname;
  function getInitials(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  }


  return (
    <header>
        <div className="date"></div>
        <div className="title"><h1>{props.title}</h1></div>
        <div className="dropbox">
        <Dropdown logout={props.logout} username={Username} initials={getInitials(fname,lname)}/>
        </div>
    </header>
  )
}
