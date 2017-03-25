import {Hello} from './hello.jsx';
import {World} from './world.jsx';
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