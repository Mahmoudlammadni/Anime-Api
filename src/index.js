import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Anime from "./api/app"



import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import reduu from './api1/redux'

const store =legacy_createStore(reduu)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<>
 <Provider store={store}><Anime/></Provider> 

</>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
