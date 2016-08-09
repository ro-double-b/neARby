import axios from 'axios';
export const PLACES_COLLECTION = 'PLACES_COLLECTION';

export const fetchPlaces = function() {


// const places = {
//     longitude: -122.0304880086256,
//     latitude: 37.33240901400225,
//     threejsLat: 0,
//     threejsLon: 0
// };

//   const collection = axios.post('/location', places)
//     .then(() => {
//       return axios.get('/location');
//     })
//     .catch((error) => {
//       console.log(error);
//     });

const places = {
    longitude: -122.0304880086256,
    latitude: 37.33240901400225,
    threejsLat: 0,
    threejsLon: 0
};

let collection = fetch('/location', {
  method: "GET",  
  body: places
})

  return {
    type: PLACES_COLLECTION,
    payload: [{name: 'san francisco', lat: 37.33240901400225, long: -122.0304880086256}, {name: 'san jose', lat: 37.33240901400227, long: -122.0304880086257}, {name: 'oakland', lat: 37.33240901400228, long: -122.0304880086258}]
  };
};