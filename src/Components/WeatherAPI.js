import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function WeatherAPI() {
  const API_KEY = "<ADD_YOUR_API_KEY>";
  const [value, setValue] = useState("");
  const [temp, setTemp] = useState();
  let flag = false;

  const setData = (e) => {
    setValue(e.target.value);
  };

  function getData() {
    flag = true;
    console.log("getData called");
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: value },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTemp(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <>
      <div className="weather">
        <p>Weather Report</p>
        {flag === true ? (
          <p>
            weather report of <strong>{value}</strong>
          </p>
        ) : (
          <p></p>
        )}
        <input
          type="text"
          placeholder="Enter name of place"
          onChange={setData}
        />
        <br />
        <Button variant="success" className="my-2 mx-5" onClick={getData}>
          Submit
        </Button>
        {temp === undefined ? null : (
          <>
            <Container className="bg-dark text-white rounded-2">
              <Row className="bg-info rounded-2">
                <Col md={12}>
                  <strong style={{ textTransform: "capitalize" }}>
                    {temp.location.name} , {temp.location.country}
                  </strong>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  Temperature: {temp.current.temp_c} &#xb0;C{" "}
                  <img src={temp.current.condition.icon} />
                </Col>
              </Row>
              <Container className="bg-light text-black rounded-2">
                <Row>
                  <Col md={12}>Humidity: {temp.current.humidity}</Col>
                </Row>
                <Row>
                  <Col md={12}>Wind: {temp.current.wind_kph} KPH</Col>
                </Row>
                <Row className="bg-warning text-white rounded-2">
                  <Col md={12}>UV: {temp.current.uv}</Col>
                </Row>
              </Container>
            </Container>
          </>
        )}
      </div>
    </>
  );
}

export default WeatherAPI;
