import { useState, useEffect, useRef } from "react";

export const SelectButton = () => {
  const [selectedOption, setSelectedOption] = useState("Select");
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
    <div className="selectButton">
      <div className="select" ref={menuRef}>
        <div className="option" onClick={handleSelectClick}>
          <div className="selected">{selectedOption}</div>
        </div>
        <ul className={isMenuOpen ? "select_menu menu-open" : "select_menu"}>
          <li onClick={() => handleOptionClick("Scan Zeis")}>
            <span>Scan Zeis </span>
          </li>
          <li onClick={() => handleOptionClick("Scan LS3")}>
            <span>Scan LS3</span>
          </li>
          <li onClick={() => handleOptionClick("Scan 3Shape")}>
            <span>Scan 3Shape</span>
          </li>
          <li onClick={() => handleOptionClick("Digital Abut")}>
            <span>Digital Abut</span>
          </li>
          <li onClick={() => handleOptionClick("Physical Abut")}>
            <span>Physical Abut</span>
          </li>
          <li onClick={() => handleOptionClick("Full Arch")}>
            <span>Full Arch</span>
          </li>
        </ul>
      </div>
    </div>
  );
};



