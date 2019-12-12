import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlanets, getVehicles } from "../Actions";
import { map } from "lodash";
import axios from "axios";
import ShowSuccessModal from "./ShowSuccessModal";
import SearchDestinations from "./SearchDestination";
class FindingFalcone extends Component {
  constructor() {
    super();
    this.state = {
      numberOfPlanetsToSearch: [1,2,3,4],
      selectedPlanets: [],
      selectedVehicles: [],
      enableFind: true,
      time: 0,
      showSuccessModal: false,
    };
  }
  componentDidMount = () => {
    this.getplanetAndVehicleDetails();
  };
  getplanetAndVehicleDetails = () => {
    this.props.dispatch(getPlanets());
    this.props.dispatch(getVehicles());
  };
  calculateTime = (destination, vehicle) => {
    var Planets = this.props.planets;
    var vehicles = this.props.vehicles;
    var planetDistance = Planets.find(obj => {
      return obj.value === destination;
    });
    var vehicleSpeed = vehicles.find(obj => {
      return obj.name === vehicle;
    });
    this.setState({
      time: this.state.time + planetDistance.distance / vehicleSpeed.speed
    });
  };
  setDestination = (destination, vehicle, destinationNumber) => {
    let { selectedPlanets, selectedVehicles } = this.state;
    this.calculateTime(destination, vehicle);
      selectedPlanets.push(destination);
      selectedVehicles.push(vehicle);
    if (destinationNumber == this.state.numberOfPlanetsToSearch) {
      this.setState({
        enableFind: false
      });
    }
  };
  findfalcone = () => {
    axios({
      method: "POST",
      url: "https://findfalcone.herokuapp.com/token",
      headers: { Accept: "application/json" }
    })
      .then(Response => {
        axios({
          method: "POST",
          url: "https://findfalcone.herokuapp.com/find",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          data: {
            token: Response.data.token,
            planet_names: this.state.selectedPlanets,
            vehicle_names: this.state.selectedVehicles
          }
        })
          .then(Response => {
            if (Response.data.status == "success") {
              this.setState({
                planet: Response.data.planet_name,
                showSuccessModal: true
              });
            } else {
              alert("OOPS! someting went wrong please try again");
            }
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  };
  closeModal = () => {
    this.setState({
      showSuccessModal: false
    });
  };
  /* createDestinations = () =>{
    let { planets, vehicles } = this.props;
    var destinations = []
    for(var index = 1;index <= this.state.numberOfPlanetsToSearch; index++){
      destinations.push(<>
        Destination {index}
        <SearchDestinations
          key={index}
          destinationNumber={index}
          planets={planets}
          vehicles={vehicles}
          selectedPlanets={this.state.selectedPlanets}
          selectedVehicles={this.state.selectedVehicles}
          setDestination={(destination, vehicle, destinationNumber) =>this.setDestination(destination, vehicle, destinationNumber)
          }
        />
        </>)
    }
    return destinations;
  } */
  render() {
    console.log(this.state.selectedVehicles)
    let showPlaces = this.state.selectedPlanets.length;
    /* var createDestinations = this.createDestinations(); */
    let {planets, vehicles } = this.props;
    return (
      <div>
        <div className="row justify-content-center">
          <h1>Finding falcone</h1>
        </div>
        <div className="row mt-5">
          <h3>Select Planets You want to Search in:</h3>
        </div>
        <div className="row justify-content-between">
          <div className="col-10">
            <div className="row mt-5">
               {map(this.state.numberOfPlanetsToSearch, (data, index) =>{
                 if(index <= showPlaces){
                  return (<div className="col-3 align-items-center text-center" key={data}>
                    <SearchDestinations
                      key={data}
                      destinationNumber={index+1}
                      planets={planets}
                      vehicles={vehicles}
                      selectedPlanets={this.state.selectedPlanets}
                      selectedVehicles={this.state.selectedVehicles}
                      setDestination={(destination, vehicle, destinationNumber) =>this.setDestination(destination, vehicle, destinationNumber)
                      }
                    />
                  </div>)
                 }
               })}
            </div>
          </div>
          <div className="col-2">
            {" "}
            <div className="row mt-5"> Time Taken : {this.state.time} </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <button
            disabled={this.state.enableFind}
            onClick={() => this.findfalcone()}
          >
            Find Falcone
          </button>
        </div>
        <ShowSuccessModal
          showModal={this.state.showSuccessModal}
          timeTaken={this.state.time}
          planet={this.state.planet}
          closeModal={() => this.closeModal()}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    planets: state.planets,
    vehicles: state.vehicles,
    time: state.time
  };
}
export default connect(mapStateToProps)(FindingFalcone);
