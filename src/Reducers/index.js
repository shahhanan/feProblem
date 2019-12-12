import * as type from "../constants/actionTypes";
import update from "immutability-helper";
import {map} from "lodash";
function changePlanetsFormat(planets){
    var newFormat = map(planets, (data, index) =>{
        return {
            label: data.name,
            value: data.name,
            distance: data.distance
        }
    })
    return newFormat
}
const initialstate = {
  planets: [],
  vehicles: [],
  selectPlanets: [],
  selcetedVehicles: [],
  time: 0
};
export function reducer(state = initialstate, action) {
  switch (action.type) {
    case type.GetPlanetsSuccess:
      return update(state, {
        planets: {
          $set: changePlanetsFormat(action.response)
        }
      });
    case type.GetvehiclesSuccess:
      return update(state, {
        vehicles: {
          $set: action.response
        }
      });
    case type.planetSelected:
      return update(state, {
        selectPlanets: {
          $set: action.response
        }
      });
    case type.vehicleSelected:
      return update(state, {
        selcetedVehicles: {
          $set: action.response
        }
      });
    case type.reset:
      return update(state, {
        time: {
          $set: action.response
        }
      });
    default:
      return state;
  }
}
