import axios from "axios";
export function getPlanetdetails() {
  return axios
    .get("https://findfalcone.herokuapp.com/planets")
    .then(response => {
      return response.data;
    })
    .catch(error => {});
}
export function getVehicledetails() {
    return axios
      .get("https://findfalcone.herokuapp.com/vehicles")
      .then(response => {
        return response.data;
      })
      .catch(error => {});
  }