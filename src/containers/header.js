import React, { Component } from "react";

export default class Header extends Component {
  reset = () => {
    window.location.reload();
  }
  render() {
    return (
      <header>
        <div className="row justify-content-end">
          <div className="col-1 resetLink"><button onClick={() => this.reset()} style={{"background":"transparent","border": "none"}}>Reset</button></div>
          <div className="col-2 geekHome"><a href="https://www.geektrust.in">GeekTrust Home</a></div>
        </div>
      </header>
    );
  }
}
