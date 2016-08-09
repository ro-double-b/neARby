import req from 'axios';
export const PLACES_COLLECTION = 'PLACES_COLLECTION';

export const fetchPlaces = function() {
const places = { body: {
    longitude: -122.0304880086256,
    latitude: 37.33240901400225,
    threejsLat: 0,
    threejsLon: 0
  }
};

  // const collection = req.post('http://localhost:3000/location', places)
    // .then((data) => {
    //   console.log(data, 'DATA');
    //   // return req.get('/location');
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
// const places = {
//     longitude: -122.0304880086256,
//     latitude: 37.33240901400225,
//     threejsLat: 0,
//     threejsLon: 0
// };

let collection = fetch('http://localhost:3000/location', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    longitude: -122.0304880086256,
    latitude: 37.33240901400225,
    threejsLat: 0,
    threejsLon: 0
  })
}).then((data) => console.log('DATA: ', data)).catch((err) => console.log('ERROR: ', err));
console.log(collection, 'collection');

  return {
    type: PLACES_COLLECTION,
    payload: collection
  };
};