import React from 'react';
import ProductoItem from './ProductoItem';

function Productos({productos, guardarRecargarProductos}){
    return (
        <>
            <h1 className="text-center">Productos</h1>
            <ul className="list-group mt-5"> 
                {productos.map(producto => (
                    <ProductoItem
                        key={producto.id}
                        producto={producto}
                        guardarRecargarProductos={guardarRecargarProductos}
                    />
                ))}
            </ul>
        </>
    )
}

export default Productos;