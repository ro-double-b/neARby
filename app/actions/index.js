import { store } from '../../index.ios.js';

export const PLACES_COLLECTION = 'PLACES_COLLECTION';
export const DRAWER_TYPE = 'DRAWER_TYPE';
export const SET_USER = 'SET_USER';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const DETAIL_SELECTED = 'DETAIL_SELECTED';
export const SEARCH_PHOTOS = 'SEARCH_PHOTOS';
export const UPDATE_EVENT_QUERY = 'UPDATE_EVENT_QUERY';
export const UPDATE_PLACE_QUERY = 'UPDATE_PLACE_QUERY';

export const fetchPlaces = (position) => {
  let collection = fetch('https://agile-peak-45133.herokuapp.com/location', {
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
      return [];
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
    return [];
  });
  return {
    type: PLACES_COLLECTION,
    payload: collection
  };
};

export const placeQuery = (query) => {
  // post request
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
      return [];
    }
  })
  .catch(function(error) {
    console.error(error);
    return [];
  });

  console.log(search);

  return {
    type: SEARCH_PLACES,
    payload: search
  };
};

export const eventQuery = (query) => {
  // post request
    let search = fetch('https://agile-peak-45133.herokuapp.com/events', {
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
      return [];
    }
  })
  .catch(function(error) {
    console.error(error);
    return [];
  });

  console.log(search);

  return {
    type: SEARCH_EVENTS,
    payload: search
  };
};

export const updatePlaceQuery = (query) => {
  return {
    type: UPDATE_PLACE_QUERY,
    payload: query
  }
}

export const updateEventQuery = (query) => {
  return {
    type: UPDATE_EVENT_QUERY,
    payload: query
  }
}

export const imageQuery = (query) => {
  // post request
  fetch('https://agile-peak-45133.herokuapp.com/images', {
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
      return [];
    }
  })
  .catch(function(error) {
    console.error(error);
    return [];
  });

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
        picture: data.picture.data.url,
        id: data.id,
        friends: data.friends.data
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
  };
};

export const RESET_PLACES_UPDATE = 'RESET_PLACES_UPDATE';

export const resetPlaceUpdate = () => {
  return {
    type: RESET_PLACES_UPDATE,
    payload: false
  };
};

//////////////////////////////
////geolocation handlers
//////////////////////////////
export const INIT_POSITION_UPDATE = 'INIT_POSITION_UPDATE';
export const CURRENT_POSITION_UPDATE = 'CURRENT_POSITION_UPDATE';
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

export const finishLoadingPosition = (boolean) => {
  console.log('updateCurrentHeading');
  return {
    type: LOADING_LOCATION,
    payload: {
      loading: boolean
    }
  };
};

//////////////////////////////
////user creation handlers
//////////////////////////////
export const USER_PLACES = 'USER_PLACES';
export const USER_EVENTS = 'USER_EVENTS';

export const addPlace = (place) => {
  console.log('addPlace');
  return {
    type: USER_PLACES,
    payload: place
  };
};

export const addEvent = (event) => {
  console.log('addEvent');
  return {
    type: USER_EVENTS,
    payload: event
  };
};

//////////////////////////////
////preview handlers
//////////////////////////////
export const PREVIEW_PANEL_OPEN = 'PREVIEW_PANEL_OPEN';
export const PREVIEW_PANEL_CLOSE = 'PREVIEW_PANEL_CLOSE';

export const openPreview = (key) => {
  console.log('openPreview');
  return {
    type: PREVIEW_PANEL_OPEN,
    payload: {
      preview: true,
      focalPlace: key
    }
  };
};

export const closePreview = () => {
  console.log('closePreview');
  return {
    type: PREVIEW_PANEL_CLOSE,
    payload: {
      preview: false
    }
  };
};

//////////////////////////////
////place ratings
//////////////////////////////
export const sendVote = (place) => {
  console.log('votePlace');
  let collection = fetch('https://agile-peak-45133.herokuapp.com/vote', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(place)
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

  return {
    type: PLACES_COLLECTION,
    payload: collection
  };
};
