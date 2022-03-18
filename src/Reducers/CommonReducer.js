import { UPDATE_LOCATION_HISTORY } from "../Actions/commonActions";

const initialState = {
  locationHistory: [],
};

const CommonReducer = (previousState = initialState, action) => {
  switch (action?.type) {
    case UPDATE_LOCATION_HISTORY: {
      return {
        ...previousState,
        locationHistory:
          previousState.locationHistory.pop() !== action?.data
            ? [...previousState.locationHistory, action?.data]
            : previousState.locationHistory,
      };
    }
    default: {
      return previousState || initialState;
    }
  }
};

export default CommonReducer;
