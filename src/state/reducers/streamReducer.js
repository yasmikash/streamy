import types from "../action-types";

const INITIAL_STATE = {};

export const streamReducer = (state = INITIAL_STATE, action) => {
  let streams;
  switch (action.type) {
    case types.FETCH_STREAMS:
      streams = {};
      for (const stream in action.payload) {
        streams[action.payload[stream].id] = action.payload[stream];
      }
      return streams;

    case types.FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case types.CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case types.UPDATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case types.DELETE_STREAM:
      streams = { ...state };
      delete streams[action.payload];
      return streams;
    // return state.map(
    //   (stream) => !Object.keys(stream).includes(action.payload.toString())
    // );

    default:
      return state;
  }
};
