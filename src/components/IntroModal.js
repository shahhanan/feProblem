import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class IntroModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    };
  }
  toggle = () => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          toggle={() => this.toggle()}
          className="introModal"
        >
          <ModalHeader toggle={() => this.toggle()}>Welcome</ModalHeader>
          <ModalBody>
            King Shan has received intelligence that Al Falcone is in hiding in
            one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin &
            Pingasor. However he has limited resources at his disposal & can
            send his army to only 4 of these planets. Your coding problem is to
            help King Shan find Al Falcone.
            <p>
              1) select 4 planets to search. <br />
              2) select which space vehicles to send to these planets.  <br />
              <span className="note">Note :- you can select only 1 planet and the associated vehicle with it at ONCE. </span><br />
              Wait for sometime and check if you were able to find the "Queen of Falicornia".<br  />
              <span>Happy Hunting!</span>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>
              Proceed
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
