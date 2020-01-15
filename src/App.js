import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';
import Productos from './components/Productos';
import Producto from './components/Producto';
import Header from './components/Header';

function App() {

  // Declara el state
  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);
  
  //ComponentDidMount
  useEffect( () => {
    if(recargarProductos) {
      const consultarApi = async () => {
        const result = await axios.get('http://localhost:4000/restaurant');
        guardarProductos(result.data);
      }
      consultarApi();
      //cambiar a false la recarga de los productos
      guardarRecargarProductos(false);
    }
  }, [recargarProductos]);//pasar dependencia de la recarga de productos al redireccionar


  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos" 
            render={ () => (
              //pasar el state de productos al componente Productos
              <Productos 
                productos={productos} 
                guardarRecargarProductos={guardarRecargarProductos}
              />
            )} 
          />
          <Route exact path="/nuevo-producto" 
            render={ () => (
              <AgregarProducto
                guardarRecargarProductos={guardarRecargarProductos}
              />
            )}
          />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/editar/:id"
            render={ props => {
              const idProducto = parseInt(props.match.params.id);
              //sacamos el producto con el mismo id del array del state con filter
              const producto = productos.filter(producto => producto.id === idProducto);
              return(
                <EditarProducto 
                  producto={producto[0]}
                  guardarRecargarProductos={guardarRecargarProductos}
                />
              )
            }}
          />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
