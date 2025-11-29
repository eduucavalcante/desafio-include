import { useState } from "react";
import logo from "../../assets/Logo.png";
import Button from "../Button";

import "./style.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="boxNavBar">
      
      <div className="navContent">
        <div className="boxLogo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={`boxLinks ${menuOpen ? "open" : ""}`}>
          <Button text="Inicio" color="#051923" href="#" />
          <Button text="Serviços" color="#051923" href="#" />
          <Button text="Quem Somos" color="#051923" href="#" />
          <Button text="Portifólio" color="#051923" href="#" />
          <Button text="Contatos" color="#051923" href="#" />

          <div className="mobileOrcamentoButton">
            <Button text="Solicitar Orçamento" color="#DA5126" href="#" />
          </div>
        </div>

        <div className="boxButton">
          <Button text="Solicitar Orçamento" color="#DA5126" href="#" />
        </div>
        
      </div>

    </div>
  );
}

export default Navbar;
