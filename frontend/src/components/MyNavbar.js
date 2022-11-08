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
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;