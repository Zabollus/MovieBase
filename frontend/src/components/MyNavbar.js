import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap'

function MyNavbar() {
    return (
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand href="/" style={{color:"white"}}>MovieBase</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href='/movie/1' style={{color:"white"}}>Najlepszy film</Nav.Link>
                    <Nav.Link href='/add/movie' style={{color:"white"}}>Dodaj film</Nav.Link>
                    <Nav.Link href='/add/person' style={{color:"white"}}>Dodaj osobę</Nav.Link>
                    <Nav.Link href='/add/genre' style={{color:"white"}}>Dodaj gatunek</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;