export const PLACES_COLLECTION = 'PLACES_COLLECTION';

export const fetchPlaces = function(position) {
  console.log('position', position);
// const places = { body: {
//     longitude: -122.0304880086256,
//     latitude: 37.33240901400225,
//     threejsLat: 0,
//     threejsLon: 0
//   }
// };

  // const collection = req.post('http://localhost:3000/location', places)
    // .then((data) => {
    //   console.log(data, 'DATA');
    //   // return req.get('/location');
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

  console.log('calling fetchPlaces');
  let collection = fetch('http://10.6.24.48:3000/location', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   longitude: -122.0304880086256,
    //   latitude: 37.33240901400225,
    //   threejsLat: 0,
    //   threejsLon: 0
    // })
    body: JSON.stringify(position)
  // }).then((data) => console.log('DATA: ', data)).catch((err) => console.log('ERROR: ', err));
  })
  .then(function(response) {
    if (response.status === 200) {
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });

  console.log(collection, 'collection');

  return {
    type: PLACES_COLLECTION,
    payload: collection
  };
};
