import React, { Component } from "react";
import {Card} from 'react-bootstrap';
import visi from './Images/visi.jpg'
import misi from './Images/misi.jpg'

export default class Visimisi extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container mt-5">
        <br />
        <h3 className="text-center">
          <b>VISI MISI</b>
        </h3>
        <h5 className="text-center mt-3">(PRIMKOPAL AKADEMI ANGKATAN LAUT)</h5>
        <Card className="mt-4">
          <Card.Body className="text-center">
            <img className="mt-3" style={{ width: "100%" }} src={visi} alt="visi"/>
            <img className="mt-4" style={{ width: "100%" }} src={misi} alt="misi"/>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
