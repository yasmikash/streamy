import streams from "../../apis/streams";
import types from "../action-types";
import history from "../../history";

export const signIn = (userId) => {
  return {
    type: types.SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT,
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const { data } = await streams.get("/streams");

    dispatch({
      type: types.FETCH_STREAMS,
      payload: data,
    });
  };
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const { data } = await streams.get(`/streams/${id}`);

    dispatch({
      type: types.FETCH_STREAM,
      payload: data,
    });
  };
};

export const createStream = (streamData) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    const { data } = await streams.post("/streams", { ...streamData, userId });

    dispatch({
      type: types.CREATE_STREAM,
      payload: data,
    });

    history.push("/");
  };
};

export const updateStream = (id, streamData) => {
  return async (dispatch) => {
    const { data } = await streams.patch(`/streams/${id}`, streamData);

    dispatch({
      type: types.UPDATE_STREAM,
      payload: data,
    });

    history.push("/");
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({
      type: types.DELETE_STREAM,
      payload: id,
    });

    history.push("/");
  };
};
