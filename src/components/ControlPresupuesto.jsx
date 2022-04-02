import {useState ,useEffect} from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible , setDisponible] = useState(0)
  const [gastado , setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

    const totalDisponible = presupuesto - totalGastado

    // calculo para hallar el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible)/presupuesto)*100).toFixed(2)

    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 600);
    
  }, [gastos]);

  const formatearCantidad  = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      // style: 'currency',
      // currency: 'USD',
      minimumFractionDigits: 2
    })
  }
  
  const handleResetApp = () => {
    const res = confirm('¿Estas seguro en resetar la app?');

    if(res){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
              styles={buildStyles({
                pathColor: porcentaje > 90 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentaje > 90 ? '#ED121D' : '#3B82F6'
              })}
              value={(100 - porcentaje).toFixed(2)}
              text={`${(100 - porcentaje).toFixed(0)}% Disponible`}
            />
        </div>

        <div className="contenido-presupuesto">
          <button 
            className='reset-app'
            type='button'
            onClick={handleResetApp}
          >
            Resetear App
          </button>
          <p>
              <span>Presupuesto: </span>S/. {formatearCantidad(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? 'negativo' : 'disponible'}`}>
              <span>Disponible: </span >S/. {formatearCantidad(disponible)}
          </p>
          <p className='gastado'>
              <span>Gastado: </span>S/. {formatearCantidad(gastado)}
          </p>
        </div>

    </div>
  )
}

export default ControlPresupuesto