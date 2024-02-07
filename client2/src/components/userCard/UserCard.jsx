import React from 'react'

const UserCards = (props) => {
  return (
    <div className='UserCards'>
    <div className="UserName">
        <div className="UserIcons" style={{backgroundColor: props.color,boxShadow: props.shadow}}><div className="circle">{props.initials}</div></div>
        <div className="UserText">{props.name}</div>
        <div className="UserData">
            <ul>

            {props.data.map((data, index) => {
              const key = Object.keys(data)[0];
              const value = data[key];
              return (
                <li className="li-card" key={index}>
                  <span className="span-key">{key}</span>
                  <span className="span-value">{value}</span>
                </li>
              );
            })}                
            </ul>
        </div>
    </div>
    </div>
  )
}


export default UserCards