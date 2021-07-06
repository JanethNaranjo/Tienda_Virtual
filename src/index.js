import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contenedor from './elementos/Contenedor'; 
import WebFont from 'webfontloader';
import{BrowserRouter,Route,Switch } from 'react-router-dom';
import TiendaVirtual from './components/TiendaVirtual';
import RegistroUsuarios from './components/RegistroUsuarios';
import InicioSesion from './components/InicioSesion';
//import {Helmet} from "react-helmet";


  
WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']

  }
});
const Index = () => {
  return (
  
    <BrowserRouter>
  
    <Contenedor>
      <Switch>
<Route path="/Iniciar-Sesion"component={InicioSesion}/>
<Route path="/Crear-Cuenta"component={RegistroUsuarios}/>
<Route path="/tienda-Virtual"component={TiendaVirtual}/>
<Route path="/"component={App}/>
  
      </Switch>
     
    </Contenedor>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));