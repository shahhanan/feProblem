import axios from "axios";
import * as types from "../constants/actionTypes";
import { getPlanetdetails, getVehicledetails } from "../Api/GetFalconedetails"; 

export function getPlanetsSuccess(response) {
    return { type: types.GetPlanetsSuccess, response };
  }
  export function getVehiclesSuccess(response) {
    return { type: types.GetvehiclesSuccess, response };
  }
export function getPlanets(){
    return function(dispatch) {
        return getPlanetdetails().then(response =>{
            dispatch(getPlanetsSuccess(response));
        }).catch(err =>{
            throw err;
        });
      };
       
}
export function getVehicles(){
    return function(dispatch) {
        return getVehicledetails().then(response =>{
            dispatch(getVehiclesSuccess(response));
        }).catch(err =>{
            throw err;
        });
      };
       
}