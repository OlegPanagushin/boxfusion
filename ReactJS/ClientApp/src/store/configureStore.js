import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { regionSelectReducer } from "../components/RegionSelect";

export default function configureStore() {
  const reducers = {
    root: rootReducer,
    region: regionSelectReducer
  };

  const middleware = [thunk];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  return createStore(
    combineReducers(reducers),
    {},
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}
