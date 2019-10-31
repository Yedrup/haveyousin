import React from 'react';
import { render } from "react-dom";
import App from "./App";
import './index.css';
import * as serviceWorker from './serviceWorker';

render(<App />, document.querySelector("#main"));
serviceWorker.register();
