import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductoItem({producto, guardarRecargarProductos}) {

    const eliminarProducto = id => {
        console.log(id);
        //TODO: eliminar registro
        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta acción no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.value) {

                try {

                    //eliminar registro
                    const url = `http://localhost:4000/restaurant/${id}`;
                    const result = await axios.delete(url);
                    if(result.status === 200){
                        Swal.fire(
                            'Eliminado!',
                            'El producto ha sido eliminado.',
                            'success'
                        );
                         //consular api de nuevo
                        guardarRecargarProductos(true);//recargar productos en la home
                    }
                   
                    
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error',
                    });
                }
               
            }
          })
    }

    return(
        <li className="list-group-item d-flex justify-content-between align-items-center" data-categorie={producto.categoria}>
            <p>{`${producto.nombrePlato} `}
                <span className="font-weight-bold">€ {producto.precioPlato}</span>
            </p>
            <div>
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-success mr-2">Editar</Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ () => eliminarProducto(producto.id)}
                >Eliminar</button>
            </div>
        </li>  
    )
}

export default ProductoItem;