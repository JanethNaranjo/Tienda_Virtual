import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'
import Boton from '../elementos/Boton'
import { auth } from '../FireBase/firebaseConfig'
import Alerta from './../elementos/Alerta'
import { GoogleLogin } from 'react-google-login';
import {
  Formulario,
  Input,
  ContenedorBoton,
} from '../elementos/ElementosDeFormulario'
import { useHistory } from 'react-router-dom'

const InicioSesion = () => {
	 const  responseGoogle=(response)=>{
console.log(response)
}
  const history = useHistory()
  const [correo, establecerCorreo] = useState('')
  const [password, establecerPassword] = useState('')
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false)
  const [alerta, cambiarAlerta] = useState({})

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      establecerCorreo(e.target.value)
    } else if (e.target.name === 'password') {
      establecerPassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    cambiarEstadoAlerta(false)
    cambiarAlerta({})

    // Comprobamos del lado del cliente que el correo sea valido.
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ingresa un correo electrónico valido',
      })
      return
    }

    if (correo === '' || password === '') {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor rellena todos los campos',
      })
      return
    }

    try {
      await auth.signInWithEmailAndPassword(correo, password)
      history.push('/')
    } catch (error) {
      console.log(error)
      cambiarEstadoAlerta(true)
      let mensaje
      switch (error.code) {
        case 'auth/wrong-password':
          mensaje = 'La contraseña no es correcta.'
          break
        case 'auth/user-not-found':
          mensaje = 'No se encontro ninguna cuenta con este correo electrónico.'
          break
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.'
          break
      }

      cambiarAlerta({ tipo: 'error', mensaje: mensaje })
    }
  }
	
  return (
    <>
      <Helmet>
        <title> Iniciar Sesion</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/Crear-Cuenta">Registrarse</Boton>
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

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {' '}
            Iniciar Sesion
          </Boton>
		 
           <GoogleLogin
            clientId="556728394565-nhva2ov3a5ja460k4nv6kf0sgnlksp4f.apps.googleusercontent.com"
            buttonText="Iniciar Sesión"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'} 
          />
		   
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

export default InicioSesion
