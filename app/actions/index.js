import { store } from '../../index.ios.js';

export const PLACES_COLLECTION = 'PLACES_COLLECTION';
export const DRAWER_TYPE = 'DRAWER_TYPE';
export const SET_USER = 'SET_USER';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const DETAIL_SELECTED = 'DETAIL_SELECTED';
export const SEARCH_PHOTOS = 'SEARCH_PHOTOS';

export const fetchPlaces = (position) => {
  // 'https://agile-peak-45133.herokuapp.com/location
  let collection = fetch('http://10.6.23.239:3000/location', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(position)
  })
  .then(function(response) {
    if (response.status === 200) {
      console.log(response);
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });
  console.log(collection, 'COLLECTION');
  return {
    type: PLACES_COLLECTION,
    payload: collection
  };
};

export const placeQuery = (query) => {
  // post request
  console.log(query, 'QUERY');
    let search = fetch('https://agile-peak-45133.herokuapp.com/places', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query)
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

  console.log(search);

  return {
    type: SEARCH_PLACES,
    payload: search
  };
};

export const eventQuery = (query) => {
  // post request
  let search = fetch('http://10.6.23.239:3000/events', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query)
  })
  .then(function(response) {
    if (response.status === 200) {
      console.log(response);
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });

  console.log(search);

  return {
    type: SEARCH_EVENTS,
    payload: search
  };
};

export const imageQuery = (query) => {
  // post request
  let search = fetch('https://agile-peak-45133.herokuapp.com/images', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query)
  })
  .then(function(response) {
    if (response.status === 200) {
      console.log(response);
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });

  console.log(search);

  return {
    type: SEARCH_PHOTOS,
    payload: search
  };
};

export const drawerState = (option, isOpen) => {
  // isOpen = isOpen ? !store.getState.drawerState.isOpen :  store.getState.drawerState.isOpen;
  return {
    type: DRAWER_TYPE,
    payload: {
      option: option,
      // isOpen: isOpen
    }
  };
};

export const getUserInfo = (err, data) => {
  if (err) {
    console.log('ERR ', err);
  } else {
    console.log(data, 'data');
    return {
      type: SET_USER,
      payload: {
        username: data.name,
        picture: data.picture.data.url
      }
    };
  }
};

export const selectPlace = (data) => {
  return {
    type: DETAIL_SELECTED,
    payload: {
      selectedEvent: data
    }
  }
};
// export const setUser = function(name, picture) {
//   let user = {
//     name: name,
//     picture: picture
//   };

//   return {
//     type: SET_USER,
//     payload: user
//   };
// };

//////////////////////////////
////geolocation handlers
//////////////////////////////
export const INIT_POSITION_UPDATE = 'INIT_POSITION_UPDATE';
export const CURRENT_POSITION_UPDATE = 'CURRENT_POSITION_UPDATE';
export const CURRENT_HEADING = 'CURRENT_HEADING';
export const API_CALL_POSITION_UPDATE = 'API_CALL_POSITION_UPDATE';
export const LOADING_LOCATION = 'LOADING_LOCATION';

export const updateInitLocation = (location) => {
  console.log('updateInitLocation');
  console.log('location',location);
  return {
    type: INIT_POSITION_UPDATE,
    payload: {
      initialPosition: location,
    }
  };
};

export const updateCurrentLocation = (location) => {
  console.log('updateCurrentLocation');
  return {
    type: CURRENT_POSITION_UPDATE,
    payload: {
      currentPosition: location.currentPosition,
      threeLat: location.threeLat,
      threeLon: location.threeLon,
      distance: location.distance
    }
  };
};

export const updateLastAPICallLocation = (location) => {
  console.log('updateLastAPICallLocation');
  return {
    type: API_CALL_POSITION_UPDATE,
    payload: {
      lastAPICallPosition: location
    }
  };
};

export const updateHeading = (degree) => {
  console.log('updateCurrentHeading');
  return {
    type: CURRENT_HEADING,
    payload: {
      currentHeading: degree
    }
  };
};

export const finishLoadingPosition = (boolean) => {
  console.log('updateCurrentHeading');
  return {
    type: LOADING_LOCATION,
    payload: {
      loading: boolean
    }
  };
};
