import { color } from "@mui/system";
import { useState, useEffect } from "react";
import Progress from "./Progress";
import swal from "sweetalert";

const ControlPresupuesto = ({ 
  presupuesto, 
  gastos,
  setGastos, 
  setPresupuesto, 
  setIsValidPresupuesto }) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => 
    gasto.cantidad + total, 0)

    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    
    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);

  }, [gastos])

  //función que le da formato a la cantidad
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  //función que resetea la app
  const handleResetApp = () => {
    swal({
      title: 'Deseas Eliminar el Presupuesto Actual?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
        swal(
          'Eliminado!',
          'Su presupuesto ha sido eliminado.',
          'Exitosamente', {icon: "success"},
        )
      } else {
        swal("No se ha eliminado el presupuesto");
      }
    })
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div id="progressBar">
      <Progress strokeWidth={8} percentage={porcentaje} />
      </div>
      <div className="contenido-presupuesto">
        <button 
          className="reset-app" 
          type="button" 
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : '' }`}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto;