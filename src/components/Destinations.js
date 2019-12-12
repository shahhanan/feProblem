import React, { Component } from "react";
import Select from "react-select";
import {map, find} from "lodash"
export default class Destinations extends Component {
  constructor() {
    super();
    this.state = {
      showVehicles: false,
      destinationSelected: "",
      vehicleMaxDistance: 0,
      isDisabled: false
    };
  }
  handleChange = selected => {
    let { planets, vehicles } = this.props;
    var findplanet = planets.find(obj => {
      return obj.value === selected.value;
    });

    this.setState({ destinationSelected: selected.value, showVehicles: true, vehicleMaxDistance: findplanet.distance })
  };
  handleVehicleChange = (e) => {
    this.setState({
      VehicleSelected: e.currentTarget.value,
      isDisabled: true
    })
    this.props.setDestination(this.state.destinationSelected, e.currentTarget.value, this.props.destinationNumber)
  };
  render() {
    let { planets, vehicles } = this.props;
    return (
      <div>
        <Select onChange={this.handleChange} options={planets} isDisabled={this.state.isDisabled}/>
        {this.state.showVehicles ? (
         map(vehicles, (data, index) =>{
           if(data.total_no > 0 && data.max_distance >= this.state.vehicleMaxDistance){
            return(
              <div className="radio" key={index}>
              <label>
                <input
                  type="radio"
                  value={data.name}
                  checked={this.state.VehicleSelected == data.name}
                  onChange={this.handleVehicleChange}
                  disabled={this.state.isDisabled}
                />
                {" "+data.name}{" ( " + data.total_no + " ) "}
              </label>
            </div>
             )
           }
           else{
            return <div />
           }
         })
        ) : (
          <div />
        )}
      </div>
    );
  }
}

