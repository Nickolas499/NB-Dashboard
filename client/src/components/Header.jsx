import React from 'react'
import {Dropdown} from './Dropdown'
export const Header = (props) => {

  const Username = "Ezequiel Almonte";
  const initials = "EA";
  return (
    <header>
        <div className="date"></div>
        <div className="title"><h1>{props.title}</h1></div>
        <div className="dropbox">
        <Dropdown logout={props.logout} username={Username} initials={initials}/>
        </div>
    </header>
  )
}
