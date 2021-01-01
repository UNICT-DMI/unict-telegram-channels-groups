import React from 'react';
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import './Menu.scss';

interface Props {
   section: String;
   setSearchInput: Function;
}

export default function Menu(props: Props): JSX.Element {
   return (
      <Navbar className="navbar-dark navbar-custom" expand="lg" fixed="top">
         <Navbar.Toggle aria-controls="basic-navbar-nav"/>
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" variant="pills" defaultActiveKey={"#/" + props.section}>
               <Nav.Link id="navbar-link" href="#/channels">Classifica Canali UNICT</Nav.Link>
               <Nav.Link id="navbar-link" href="#/groups">Gruppi DMI UNICT</Nav.Link>
               <Nav.Link id="navbar-link" href="#/bots">Bots UNICT</Nav.Link>
            </Nav>
            <Form>
               <FormControl className="ml-auto" type="text" placeholder="Cerca"
                            onChange={e => (props.setSearchInput(e.target.value))}/>
            </Form>
         </Navbar.Collapse>
      </Navbar>
   );
}
