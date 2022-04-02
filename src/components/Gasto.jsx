import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import {fetch} from '../helpers/fetch'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
import IconoVenecas from '../img/icono_veneca.svg'

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const diccionarioIcons = {
        ahorro : IconoAhorro,
        casa: IconoCasa,
        comida: IconoComida,
        gastos: IconoGastos,
        ocio: IconoOcio,
        salud: IconoSalud,
        suscripciones: IconoSuscripciones,
        venecas: IconoVenecas
    }

    const {id, nombre, cantidad, categoria, fecha} = gasto

    const handleLeading = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const handleTrailing = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive = {true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions = {handleLeading()} // direccion izquierda
                trailingActions = {handleTrailing()} // direccion derecha
            >
                <div className="gasto sombra">    
                    <div className="contenido-gasto">
                        <img 
                            src={diccionarioIcons[categoria]}
                            alt="Icono Gasto" 
                            draggable={false}
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria} </p>
                            <p className="nombre-gasto">{nombre} </p>
                            <p className='fecha-gasto'>Agregado el: <span>{fetch(fecha)}</span></p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>S/. {cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
  )
}

export default Gasto