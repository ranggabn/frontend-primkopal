import React, { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCameraRetro,
  faPencilAlt,
  faBriefcase,
  faCar,
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";

const api = "http://localhost:3001";

export default function Kategori(props) {
  const [kategori, setkategori] = useState([]);
  useEffect(() => {
    axios.get(api + "/tampilKategori").then((res) => {
      setkategori(res.data.values);
    });
  }, []);
  const kb = kategori.map((kb) => kb);

  const Icon = ({ nama }) => {
    if (nama == "Bahan Pokok")
      return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
    if (nama == "Alat Tulis")
      return <FontAwesomeIcon icon={faPencilAlt} className="mr-3" />;
    if (nama == "Alat Kantor")
      return <FontAwesomeIcon icon={faBriefcase} className="mr-3" />;
    if (nama == "Elektronik")
      return <FontAwesomeIcon icon={faCameraRetro} className="mr-3" />;
    if (nama == "Kendaraan")
      return <FontAwesomeIcon icon={faCar} className="mr-3" />;
    if (nama == "Merchandise")
      return <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />;

      return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
  };

  function tampil(id){
    console.log(id);
    props.history.push('/menu')
  }

  return (
    <Col md={2} mt="2">
      <hr />
      <h4>
        <strong>Kategori</strong>
      </h4>
      <hr />
      <ListGroup>
        {kb.map((kb, key) => (
          <ListGroupItem tag="button" action key={key}>
            <Icon nama={kb.kategori_barang} />
            {kb.kategori_barang}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Col>
  );
}
