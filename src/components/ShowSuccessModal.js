import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class ShowSuccessModal extends Component {
  constructor(){
      super();
      this.state={
      }
  }
  toggle = () =>{
    this.props.closeModal(this.props.showModal)
    window.location.reload();
  }
    render() {

    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={() => this.toggle()} >
          <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
          <ModalBody>
           Succcess! Congratulation on finding falcone. King Khan is Mighty Pleased. <br  />
           time Taken: {this.props.timeTaken}
           Planet found: {this.props.planet}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
