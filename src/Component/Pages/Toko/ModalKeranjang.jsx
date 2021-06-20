import React from "react";
import { ModalTitle } from "react-bootstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { numberWithCommas } from "../../Fungsional/Koma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

export default function ModalKeranjang({ showModal, handleClose, keterangan }) {
  if (keterangan) {
    return (
      <div>
        <Modal isOpen={showModal}>
          <ModalHeader>
            <ModalTitle>
              <strong>{keterangan.nama}</strong> (Rp.{" "}
              {numberWithCommas(keterangan.harga)})
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Total Harga : </Label>
                <strong>
                  <p>Rp. {numberWithCommas(keterangan.jumlah_harga)}</p>
                </strong>
              </FormGroup>
              <FormGroup >
                <Label>Jumlah :</Label>
                <br/>
                <Button color="primary" size="sm">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                <strong>{keterangan.jumlah}</strong>
                <Button color="primary" size="sm">
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>{" "}
            <Button color="primary">Save Changes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Modal isOpen={showModal}>
          <ModalHeader>Kosong</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>{" "}
            <Button color="primary">Save Changes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
