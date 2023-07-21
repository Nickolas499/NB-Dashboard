import { useState, useEffect, useRef } from "react";

export const SelectComponet = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.default);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSelectClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsMenuOpen(false);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="selectComponet">
      <div className="select" ref={menuRef}>
        <div className="option" onClick={handleSelectClick}>
          <div className="selected" style={{color: selectedOption}}>{selectedOption}</div>
        </div>
        <ul className={isMenuOpen ? "select_menu menu-open" : "select_menu"}>
          {props.items.map((item, index) => (
            <li key={index} onClick={() => handleOptionClick(item)}>
              {props.default !== "Color" ? <span>{item}</span> : <span style={{color:item}}>{item}</span>}             
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
