import React, { Component } from "react";
import { map, findIndex } from "lodash";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
function importAll(r) {
  return r.keys().map(r);
}
const planetImages = importAll(require.context("../assets/planets/", false, /\.(png)$/));
const vehicleImages =  importAll(require.context("../assets/vehicles/", false, /\.(png)$/));

export default class Destinations extends Component {
  constructor() {
    super();
    this.state = {
      destinationPopoverOpen: false,
      vehiclePopoverOpen: false,
      showVehicles: false,
      destinationSelected: "",
      vehicleMaxDistance: 0,
      isDisabled: false,
      selectedDestinationData: null,
      selectedVehicleData: null,
      hideDestinationButton: false,
      hideVehicleButton: false,
      planetImage: planetImages,
      vehicleImage: vehicleImages
    };
  }
  handlePlanetChange = (selected, destination) => {
    let { planets } = this.props;
    var findplanet = planets.find(obj => {
      return obj.value === selected.value;
    });

    this.setState({
      destinationSelected: selected.value,
      showVehicles: true,
      vehicleMaxDistance: findplanet.distance,
      destinationPopoverOpen: false,
      selectedDestinationData: destination
    });
  };
  handleVehicleChange = (data, vehicleInfo) => {
    this.setState({
      VehicleSelected: data.name,
      isDisabled: true,
      selectedVehicleData: vehicleInfo,
      vehiclePopoverOpen: false,
      hideDestinationButton: true,
      hideVehicleButton: true
    });
    this.props.setDestination(
      this.state.destinationSelected,
      data.name,
      this.props.destinationNumber
    );
  };
  toggleDesinationPopup = () => {
    this.setState({
      destinationPopoverOpen: !this.state.destinationPopoverOpen
    });
  };
  toggleVehiclePopup = () => {
    this.setState({
      vehiclePopoverOpen: !this.state.vehiclePopoverOpen
    });
  };
  availablePlanets = () => {
    let { planets, selectedPlanets } = this.props;
    let availablePlanets = planets;
    if (selectedPlanets.length != 0) {
      selectedPlanets.forEach(function(data) {
        var indexOfplanet = findIndex(planets, {value : data});
        if (indexOfplanet != -1) {
          availablePlanets.splice(indexOfplanet, 1);
          planetImages.splice(indexOfplanet, 1);
        }
      });
    }
    return availablePlanets;
  };
  availableVehices = () => {
    let { vehicles, selectedVehicles } = this.props;
    let availableVehices = JSON.parse(JSON.stringify(vehicles))
    let selected = selectedVehicles;
    let vImages = this.state.vehicleImage;
    if (selected.length != 0) {
      selected.forEach(function(data) {
        var indexOfvehicle = findIndex(availableVehices, {name : data});
        if (indexOfvehicle != -1) {
          if (vehicles[indexOfvehicle].total_no > 1) {
            availableVehices[indexOfvehicle].total_no--;
          } else {
            availableVehices.splice(indexOfvehicle, 1);
            vImages.splice(indexOfvehicle, 1);
          }
        }
      });
    }
    return availableVehices;
  }; 
  render() {
    let availablePlanets = this.availablePlanets();
    let availableVehices = this.availableVehices();
    let { planetImage, vehicleImage } = this.state
    return (
      <div>
        <div>
          {!this.state.hideDestinationButton ? (
            <Button
              id="selectdestination"
              type="button"
              disabled={this.state.hideDestinationButton}
            >
              Select Destination
            </Button>
          ) : null}
          <Popover
            placement="bottom"
            isOpen={this.state.destinationPopoverOpen}
            target="selectdestination"
            toggle={() => this.toggleDesinationPopup()}
          >
            <PopoverHeader>Suspected Planets</PopoverHeader>
            <PopoverBody>
              {map(availablePlanets, (data, index) => {
                let planetObject = {
                  planetImage: planetImage[index],
                  planetName: data.value,
                  planetDistance: data.distance
                };
                return (
                  <div
                    className="planet align-items-center text-center"
                    key={index}
                    onClick={() => this.handlePlanetChange(data, planetObject)}
                  >
                    <img src={planetImage[index]} />
                    <span id={data.value}>Planet Name: {data.label}</span>
                    <span>Distance: {data.distance}</span>
                  </div>
                );
              })}
            </PopoverBody>
          </Popover>
          {this.state.selectedDestinationData ? (
            <div>
              {" "}
              <img src={this.state.selectedDestinationData.planetImage} />{" "}
              <p>
                Selected Planet: {this.state.selectedDestinationData.planetName}
              </p>{" "}
              <p>
                Distance: {this.state.selectedDestinationData.planetDistance}
              </p>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        {this.state.showVehicles ? (
          <div>
            {!this.state.hideVehicleButton ? (
              <Button
                id="selectVehicles"
                type="button"
                disabled={this.state.hideVehicleButton}
              >
                Select Vehicle
              </Button>
            ) : null}
            <Popover
              placement="bottom"
              isOpen={this.state.vehiclePopoverOpen}
              target="selectVehicles"
              toggle={() => this.toggleVehiclePopup()}
            >
              <PopoverHeader>Vehicles Available</PopoverHeader>
              <PopoverBody>
                {map(availableVehices, (data, index) => {
                  if (
                    data.total_no > 0 &&
                    data.max_distance >= this.state.vehicleMaxDistance
                  ) {
                    let vehicleInfo = {
                      vehicleImage: vehicleImage[index],
                      vehicleName: data.name,
                      vehicleNumbers: data.total_no,
                      vehicleSpeed: data.speed
                    };
                    return (
                      <div
                        className="pods align-items-center text-center"
                        key={index + "pods"}
                      >
                        <img
                          src={vehicleImage[index]}
                          onClick={() =>
                            this.handleVehicleChange(data, vehicleInfo)
                          }
                        />
                        <p>{"Vehicle Name:  " + data.name}</p>
                        <p>
                          {"Available Resources ( " + data.total_no + " ) "}
                        </p>
                        <p>{"Speed ( " + data.speed + " ) "}</p>
                      </div>
                    );
                  } else {
                    return <div key={index + "aa"} />;
                  }
                })}
              </PopoverBody>
            </Popover>
            {this.state.selectedVehicleData ? (
              <div>
                {" "}
                <img src={this.state.selectedVehicleData.vehicleImage} />{" "}
                <p>
                  Selected Vehicle: {this.state.selectedVehicleData.vehicleName}
                </p>{" "}
                <p>
                  Vehicle Speed: {this.state.selectedVehicleData.vehicleSpeed}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
