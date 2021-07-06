import React from 'react';
import Productos from './productos';

const TiendaVirtual = ({productos, agregarProductoAlCarrito}) => {
	return (
		<div>
			<h1>Tienda Virtual</h1>
			<Productos 
				productos={productos}
				agregarProductoAlCarrito={agregarProductoAlCarrito} 
			/>
		</div>
	);
}
 
export default TiendaVirtual;