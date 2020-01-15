import React, {useState} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';


function AgregarProducto({history, guardarRecargarProductos}){

    //State
    const [nombrePlato, guardarNombre] = useState('');
    const [precioPlato, guardarPrecio] = useState('');
    const [categoriaPlato, guardarCategoria] = useState('');
    const [error, guardarError] = useState(false);
    

    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }

    const agregarProducto = async e => {
        e.preventDefault();
        if(nombrePlato === '' || precioPlato === '' || categoriaPlato === ''){
            //generar error
            guardarError(true);
            return;
        }
        //no error
        guardarError(false);
        //crear nuevo producto
        try {
            const result = await axios.post('http://localhost:4000/restaurant', {
                nombrePlato,
                precioPlato,
                categoriaPlato
            });
            console.log(result);
            if(result.status === 201){
                Swal.fire(
                    'Producto creado',
                    'El producto se creó correctamente',
                    'success'
                );
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });
        }

        //redirect
        guardarRecargarProductos(true);//recargar productos en la home
        history.push('/productos');
    }

    return (

        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar nuevo producto</h1>
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <form
                className="mt-5"
                onSubmit={agregarProducto}
            >
                <div className="form-group">
                    <label>Nombre Plato</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Plato"
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Plato"
                        onChange={e => guardarPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        id="postres"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label" htmlFor="postres">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        id="bebida"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label" htmlFor="bebida">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        id="cortes"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label" htmlFor="cortes">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        id="ensalada"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label" htmlFor="ensalada">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>

    )
}

export default withRouter(AgregarProducto);