import "devextreme-intl";
import React from "react";
import ReactDOM from "react-dom";
import "./css/dx.common.css"
import "./css/achsTheme.css";
import "./styles/styles.scss";
import "./styles/styles.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import ReactAI from 'react-appinsights';

const esMessages = require('devextreme/localization/messages/es.json');
const localization = require('devextreme/localization')
localization.loadMessages(esMessages);
localization.locale(navigator.language || navigator.browserLanguage);


ReactAI.init({instrumentationKey:'8a1c69be-30ce-4375-9d1b-3868061eb863'});


ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
 
