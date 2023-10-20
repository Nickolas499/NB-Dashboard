import React from "react";

export const Input = (props) => {
  return (
    <div className="Input">
      <div className="label">{props.label}</div>
      <input
        id={props.id}
        className="Input_field"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
