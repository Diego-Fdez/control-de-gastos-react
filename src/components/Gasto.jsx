import { formatearFecha } from "../helpers";
import AhorroIcon from "../img/icono_ahorro.svg";
import CasaIcon from "../img/icono_casa.svg";
import ComidaIcon from "../img/icono_comida.svg";
import GastosIcon from "../img/icono_gastos.svg";
import OcioIcon from "../img/icono_ocio.svg";
import SaludIcon from "../img/icono_salud.svg";
import SuscripcionIcon from "../img/icono_suscripciones.svg";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const diccionarioIconos = {
  ahorro: AhorroIcon,
  comida: ComidaIcon,
  casa: CasaIcon,
  gastos: GastosIcon,
  ocio: OcioIcon,
  salud: SaludIcon,
  suscripciones: SuscripcionIcon,
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={ () => setGastoEditar(gasto) }>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => eliminarGasto(gasto.id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img
              src={diccionarioIconos[gasto.categoria]}
              alt='Icono de Gasto'
            />
            <div className='descripcion-gasto'>
              <p className='categoria'>{gasto.categoria}</p>
              <p className='nombre-gasto'>{gasto.nombre}</p>
              <p className='fecha-gasto'>
                Agregado el <span> {formatearFecha(gasto.fecha)}</span>
              </p>
            </div>
            <p className='cantidad-gasto'>$ {gasto.cantidad}</p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
