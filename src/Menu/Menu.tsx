import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import './Menu.scss';

interface Props {
   section: String;
}

export function Menu(props: Props): JSX.Element {
   return (
      <Navbar className="navbar-dark navbar-custom" expand="lg" fixed="top">
         <Navbar.Toggle aria-controls="basic-navbar-nav"/>
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto" variant="pills" defaultActiveKey={"#/" + props.section}>
               <Nav.Link className="nav-link" href="#/channels">Classifica Canali UNICT</Nav.Link>
               <Nav.Link className="nav-link" href="#/groups">Gruppi DMI UNICT</Nav.Link>
               <Nav.Link className="nav-link" href="#/bots">Bots UNICT</Nav.Link>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
}
