import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Titulo, ContenedorHeader } from './../elementos/Header'
import Boton from '../elementos/Boton'
import { useHistory } from 'react-router-dom'
import Alerta from './../elementos/Alerta';

import {
  Formulario,
  Input,
  ContenedorBoton,
} from './../elementos/ElementosDeFormulario'
import { auth } from '../FireBase/firebaseConfig'

const RegistroUsuarios = () => {
  const history = useHistory()
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [password2, establecerPassword2] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({})

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        establecerCorreo(e.target.value);
        break;
      case 'password':
        establecerPassword(e.target.value);
        break;
      case 'password2':
        establecerPassword2(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({})

    // Comprobamos del lado del cliente que el correo sea valido.
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor ingrese un correo electronico valido',
      });
      return;
    }
    if (correo === '' || password === '' || password2 === '') {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor rellene todos los datos',
      });
      return;
    }
    if (password !== password2) {
     
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'las contraseñas no son iguales',
      });
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(correo, password);
      history.push('/')
    } catch (error) {
      cambiarEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case 'auth/invalid-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
          break;
        case 'auth/email-already-in-use':
          mensaje ='Ya existe una cuenta con el correo electrónico proporcionado.'
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.'
          break;
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.'
          break;
      }
      cambiarAlerta({tipo:'error',mensaje:mensaje});
    }
  }

  return (
    <>
      <Helmet>
        <title> crear cuenta</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Crear cuenta</Titulo>
          <div>
            <Boton to="/Iniciar-Sesion">Iniciar sesion</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="contraseña"
          value={password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repetir contraseña"
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Crear Cuenta
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  )
}

export default RegistroUsuarios;
