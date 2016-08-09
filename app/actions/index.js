import req from 'axios';
export const PLACES_COLLECTION = 'PLACES_COLLECTION';

export const fetchPlaces = function() {
const places = {
    longitude: -122.0304880086256,
    latitude: 37.33240901400225,
    threejsLat: 0,
    threejsLon: 0
};

  const collection = req.post('/location', places)
    .then((data) => {
      console.log(data, 'DATA');
      // return req.get('/location');
    })
    .catch((error) => {
      console.log(error);
    });
console.log(collection, 'collection');
// const places = {
//     longitude: -122.0304880086256,
//     latitude: 37.33240901400225,
//     threejsLat: 0,
//     threejsLon: 0
// };

// let collection = fetch('/location', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     longitude: -122.0304880086256,
//     latitude: 37.33240901400225,
//     threejsLat: 0,
//     threejsLon: 0
//   })
// });

  return {
    type: PLACES_COLLECTION,
    payload: [{name: 'san francisco', lat: 37.33240901400225, long: -122.0304880086256}, {name: 'san jose', lat: 37.33240901400227, long: -122.0304880086257}, {name: 'oakland', lat: 37.33240901400228, long: -122.0304880086258}]
  };
};