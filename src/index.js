import React from "react";
import ReactDOM from "react-dom";
import "./style/styles.css";
import "turn.js";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { DFPSlotsProvider, DFPManager, AdSlot } from 'react-dfp';

import Epaper from "./components/Epaper";
import Inicio from "./components/Inicio";

const Aplicacion = () => {

  return (
    <BrowserRouter>
      <DFPSlotsProvider dfpNetworkId="13921681">
      <Route exact path="/">
        <Inicio></Inicio>
      </Route>
      <Route exact path="/epaper/:version" render={(props) => <Epaper {...props} />}>
      </Route>
      </DFPSlotsProvider>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Aplicacion />, rootElement);
