// External dependencies
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./config/store";

// Components
import Main from "./components/Main/view";

const { store, history } = configureStore();

// Application root component
class App extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUExpQhPB2_gwK8fL9KBmNO_33qXJkQnQ&libraries=places";
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    return (
      <Provider store={store}>
        <Main history={history} />
      </Provider>
    );
  }
}

export default App;
