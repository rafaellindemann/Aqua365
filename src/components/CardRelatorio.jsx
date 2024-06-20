import React from 'react'
import styles from './CardRelatorio.module.css'

function CardRelatorio({relatorio}) {

  return (
    <div className={styles.containerCard}>
        {console.log("card")}
      <h2>{relatorio.mes}</h2>
      <p>Volume: {relatorio.volume}m3</p>
      <p>Endereço: {relatorio.endereco}</p>
      <p>Descrição: {relatorio.descricao}</p>
      <h2>card</h2>
    </div>
  )
}

// "mes": "4/2024",
// "volume": "1500",
// "userID": "1",
// "endereco": "Casa",
// "descricao": "Relatório de água"

export default CardRelatorio
