import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import styles from './Dashboard.module.css';
import ConsumptionChart from '../components/ConsumptionChart';

function Dashboard() {
  const { usuarios, relatorios, loggedUser, dicas } = useContext(GlobalContext);
  const [dicaDoDia, setDicaDoDia] = useState('');

  const totalUsuarios = usuarios.length;
  const totalRelatorios = relatorios.length;
  const userRelatorios = relatorios.filter(rel => rel.userID === loggedUser.id);
  const totalRelatoriosUsuario = userRelatorios.length;

  useEffect(()=>{
    const dica = dicas[Math.floor(Math.random() * dicas.length)];
    setDicaDoDia(dica);
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Total de Usuários</h3>
          <p className={styles.text}>{totalUsuarios}</p>
        </div>
        <div className={styles.card}>
          <h3>Total de Relatórios</h3>
          <p className={styles.text}>{totalRelatorios}</p>
        </div>
        <div className={styles.card}>
          <h3>Seus Relatórios</h3>
          <p className={styles.text}>{totalRelatoriosUsuario}</p>
        </div>
      </div>
        <h2 className={styles.subtitulo}>Seus Relatórios</h2>
      <div className={styles.relatorios}>
        {userRelatorios.length === 0 ? (
          <p className={styles.text}>Nenhum relatório encontrado.</p>
        ) : (
          userRelatorios.map((relatorio) => (
            <div key={relatorio.id} className={styles.cardRelatorio}>
              <p className={styles.text}><strong>Mês:</strong> {relatorio.mes}</p>
              <p className={styles.text}><strong>Consumo:</strong> {relatorio.volume}</p>
              <p className={styles.text}><strong>Endereço:</strong> {`${relatorio.endereco.logradouro}, ${relatorio.endereco.complemento}, ${relatorio.endereco.bairro}, ${relatorio.endereco.localidade}, ${relatorio.endereco.uf}`}</p>
              <p className={styles.text}><strong>Descrição:</strong> {relatorio.descricao}</p>
            </div>
          ))
        )}
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.subtitulo}>Progresso do Consumo de Água</h2>
        <ConsumptionChart />
      </div>
      {!!dicaDoDia && (
        <div className={styles.dica}>
          <h2 className={styles.subtitulo}>Dica do Dia</h2>
          <p className={styles.dicaText}>{dicaDoDia}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
