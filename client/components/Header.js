import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Link from 'next/link'

const Header = () => {
  return (
    <Navbar bg="success" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand style={{ cursor: 'pointer' }}>Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <React.Fragment>
              <Link href="/signup">
                <Nav.Link as="a" href="/signup">
                  Sign Up
                </Nav.Link>
              </Link>
              <Link href="/login">
                <Nav.Link as="a" href="/login">
                  Log In
                </Nav.Link>
              </Link>
            </React.Fragment>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
