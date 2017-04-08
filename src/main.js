import './main.scss';
import {Hello} from './hello';
import {World} from './world';
import React from 'react';
import ReactDOM from 'react-dom';


function bootstrap() {
  let jsx = <div><World/><Hello/></div>;
  ReactDOM.render(jsx, document.getElementById('app'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  bootstrap();
} else {
  window.addEventListener('DOMContentLoaded', bootstrap, false);
}