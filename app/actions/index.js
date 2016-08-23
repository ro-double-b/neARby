import { store } from '../../index.ios.js';

export const PLACES_COLLECTION = 'PLACES_COLLECTION';
export const DRAWER_TYPE = 'DRAWER_TYPE';
export const SET_USER = 'SET_USER';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const DETAIL_SELECTED = 'DETAIL_SELECTED';
export const SEARCH_PHOTOS = 'SEARCH_PHOTOS';
export const RESET_PLACES_UPDATE = 'RESET_PLACES_UPDATE';

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
    payload: {
      search: search,
      query: query
    }
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
      console.log(response, 'RESULTS');
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
    type: SEARCH_EVENTS,
    payload: {
      search: search,
      query: query
    }
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
  };
};

export const resetPlaceUpdate = () => {
  return {
    type: RESET_PLACES_UPDATE
  };
};
