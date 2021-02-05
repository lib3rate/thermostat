import React from "react";

import Alert from "./components/Alert/Alert";
import NavigationDrawer from "./components/Navigation/Navigation";

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Alert/>
      <NavigationDrawer/>
    </div>
  );
}