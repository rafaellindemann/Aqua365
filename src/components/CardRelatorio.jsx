import React from 'react'
import styles from './CardRelatorio.module.css'

function CardRelatorio({relatorio}) {

  return (
    <div className={styles.containerCard}>
      <h2>{relatorio.mes}</h2>
      <p className={styles.pRel}>Volume: {relatorio.volume}m3</p>
      <p className={styles.pRel}>Endereço: {relatorio.endereco}</p>
      <p className={styles.pRel}>Descrição: {relatorio.descricao}</p>
    </div>
  )
}

export default CardRelatorio

// "mes": "4/2024",
// "volume": "1500",
// "userID": "1",
// "endereco": "Casa",
// "descricao": "Relatório de água"

