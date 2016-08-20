import { DETAIL_SELECTED } from '../actions/index';
import { PREVIEW_PANEL_OPEN } from '../actions/index';
import { PREVIEW_PANEL_CLOSE } from '../actions/index';

const initialState = {
  selectedEvent: null,
  preview: false,
  focalPlace: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DETAIL_SELECTED:
      return { ...state,
      	selectedEvent: action.payload.selectedEvent,
      };
  	case PREVIEW_PANEL_OPEN:
      return { ...state,
      	focalPlace: action.payload.focalPlace,
      	preview: true
      };
  	case PREVIEW_PANEL_CLOSE:
      return { ...state,
      	preview: false
      };
    default:
      return state;
  }
}
