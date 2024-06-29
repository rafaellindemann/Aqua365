import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import styles from './ListaRelatorios.module.css';

function ListaRelatorios() {
  const { relatorios, setRelatorios } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleEdit = (relatorio) => {
    navigate('/editar-relatorio', { state: { relatorio } });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este relatório?');
    if (confirmDelete) {
      setRelatorios(relatorios.filter(rel => rel.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Relatórios</h1>
      {relatorios.map((relatorio) => (
        <div key={relatorio.id} className={styles.card}>
          <p className={styles.text}>Mês: {relatorio.mes}</p>
          <p className={styles.text}>Consumo: {relatorio.volume}</p>
          <button onClick={() => handleEdit(relatorio)}>Editar</button>
          <button onClick={() => handleDelete(relatorio.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}

export default ListaRelatorios;
