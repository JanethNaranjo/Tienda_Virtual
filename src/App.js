import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLink, Switch, Route} from 'react-router-dom';

import Tienda from './components/TiendaVirtual';

import Carrito from './components/Carrito';

const App = () => {
    const productos = [
		{id: 1, nombre: 'Producto 1'},
		{id: 2, nombre: 'Producto 2'},
		{id: 3, nombre: 'Producto 3'},
		{id: 4, nombre: 'Producto 4'}
    ];
    
    const [carrito, cambiarCarrito] = useState([]);
    // [
    //     {id: 1, nombre: 'Producto 1', cantidad: 1},
    //     {id: 2, nombre: 'Producto 2', cantidad: 2}
    // ]

    const agregarProductoAlCarrito = (idProductoAAgregar, nombre) => {
        // Si el carrito no tiene elementos entonces agregamos uno.
        if(carrito.length === 0){
            cambiarCarrito([{id: idProductoAAgregar, nombre: nombre, cantidad: 1}]);
        } else {
            // De otra foma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
			// Si ya lo tiene entonces queremos actualizar su valor.
			// Si no tiene el producto entonces lo agregamos.

            // Para poder editar el arreglo tenemos que clonarlo.
            const nuevoCarrito = [...carrito];

            // Comprobamos si el carrito ya tiene el ID del producto a agregar.
            const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                return productoDeCarrito.id === idProductoAAgregar
            }).length > 0;

            // Si ya tiene el producto entonces lo tenemos que actualizar.
            if(yaEstaEnCarrito){
                // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
                // Y en base a su posicion ya actualizamos el valor.
                nuevoCarrito.forEach((productoDeCarrito, index) => {
                    if(productoDeCarrito.id === idProductoAAgregar){
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {
                            id: idProductoAAgregar, 
                            nombre: nombre, 
                            cantidad: cantidad + 1
                        }
                    }
                });
            // De otra forma entonces agregamos el producto al arreglo.
            } else {
                nuevoCarrito.push(
                    {
                        id: idProductoAAgregar,
                        nombre: nombre,
                        cantidad: 1
                    }
                );
            }

            // Por ultimo actualizamos el carrito.
            cambiarCarrito(nuevoCarrito);
        }
    }

	return (
		<Contenedor>
			<Menu>
			
				<NavLink to="/tienda Virtual">Tienda</NavLink>
			</Menu>
			<main>
				<Switch>
				
					<Route path="/tienda Virtual">
                        <Tienda 
                            productos={productos} 
                            agregarProductoAlCarrito={agregarProductoAlCarrito}
                        />
                    </Route>
			
				</Switch>
			</main>
			<aside>
                <Carrito carrito={carrito}/>
			</aside>
		</Contenedor>
	);
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;

export default App;