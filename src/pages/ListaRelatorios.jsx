import React, {useContext} from 'react'
import CardRelatorio from '../components/CardRelatorio';
import { GlobalContext } from '../context/GlobalContext'
import lista from './ListaRelatorios.module.css'

function ListaRelatorios() {
  const {usuarios, isLoading, relatorios} = useContext(GlobalContext);
  return (
    <>
      <h1>Relatórios cadastrados</h1>
      <div className={lista.containerRelatorios}>
        {relatorios.map((relatorio, index) => (
            <CardRelatorio relatorio={relatorio} key={index}/>
        ))}
      </div>
    </>
  )
}

export default ListaRelatorios
