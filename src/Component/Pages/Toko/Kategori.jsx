import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const api = "http://localhost:3004";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-3" />;
  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(api + "/categories")
      .then((res) => {
        console.log("Response : ", res);
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory } = this.props;
    return (
      <Col md={2} mt="2">
        <hr />
        <h4>
          <strong>Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((kategori) => (
              <ListGroupItem
                tag="button"
                action
                key={kategori.id}
                onClick={() => changeCategory(kategori.nama)}
              >
                <Icon nama={kategori.nama} />
                {kategori.nama}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
