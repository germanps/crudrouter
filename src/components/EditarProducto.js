import React, {useState, useRef} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Error from './Error';
import { withRouter } from 'react-router-dom'

function EditarProducto(props){

    const {producto, history, guardarRecargarProductos} = props;

    //generar Refs
    const precioPlatoRef = useRef('');
    const nombrePlatoRef = useRef('');
    

    //State
    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');

    //Métodos
    const editarProducto = async e => {
        e.preventDefault();

        //Validación
        const nuevoPrecioPlato = precioPlatoRef.current.value;
        const nuevoNombrePlato = nombrePlatoRef.current.value;
        console.log(nuevoNombrePlato, nuevoPrecioPlato);

        if(nuevoPrecioPlato === '' || nuevoNombrePlato === ''){
            guardarError(true);
            return;
        }

        //guardarError(false);
        //Revisar categoria
        let categoriaPlato = categoria === '' ? producto.categoria : categoria;
        //Obtener los valores del formulario
        const editarPlato = {
            precioPlato: nuevoPrecioPlato,
            nombrePlato: nuevoNombrePlato,
            categoria: categoriaPlato
        }
        //enviar el request
        const url = `http://localhost:4000/restaurant/${producto.id}`;
        try {
            const result = await axios.put(url, editarPlato);
            if(result.status === 200){
                Swal.fire(
                    'Producto editado',
                    'El producto se editó correctamente',
                    'success'
                );
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
            });
        }

        //redireccionar
        guardarRecargarProductos(true);//recargar productos en la home
        history.push('/productos');
    }
    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }
    

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar producto</h1>
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Plato</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Plato"
                        ref={nombrePlatoRef}
                        defaultValue={producto.nombrePlato}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Plato"
                        ref={precioPlatoRef}
                        defaultValue={producto.precioPlato}
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
                        defaultChecked={(producto.categoria === 'postre')}
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
                        defaultChecked={(producto.categoria === 'bebida')}
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
                        defaultChecked={(producto.categoria === 'cortes')}
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
                        defaultChecked={(producto.categoria === 'ensalada')}
                    />
                    <label className="form-check-label" htmlFor="ensalada">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProducto);