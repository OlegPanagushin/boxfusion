import { SELECT_REGION } from "../components/RegionSelect";

export const NEW_MESSAGE = "NEW_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

const initialState = {
  message: "",
  region: ""
};

export default (state = { ...initialState }, action) => {
  const { type, message, region } = action;

  switch (type) {
    case NEW_MESSAGE:
      return { ...state, message };

    case REMOVE_MESSAGE:
      return { ...state, message: "" };

    case SELECT_REGION:
      return { ...state, region };

    default:
      return { ...state };
  }
};
