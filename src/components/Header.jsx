import React from 'react'
import { Button, Image, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { changeMusareTemperature } from '../redux/weather/weather_action'

const Header = ({ metric, changeMusareTemperature }) => {

  const renderBtnToChangeMusare = () => {

    return <Button onClick={changeMusareTemperature} variant="">Change to  {metric ? '℉' : '℃'} </Button>

  }

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#/"><Image src="./brand.gif" className="brandImage" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#/">Home</Nav.Link>
          <Nav.Link href="#/favorites">favorites</Nav.Link>
        </Nav>
        {renderBtnToChangeMusare()}

      </Navbar.Collapse>

    </Navbar>
  )
}

const mapStateToProps = ({ weather_reducer }) => ({
  metric: weather_reducer.metric
})

const mapDispatchToProps = {
  changeMusareTemperature
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
