import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import styles from './ListaRelatorios.module.css';

function ListaRelatorios() {
  const { relatorios, setRelatorios, loggedUser } = useContext(GlobalContext);
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

  const userRelatorios = relatorios.filter(rel => rel.userID === loggedUser.id);

  return (
    <>
      <h1>Lista de Relatórios</h1>
      <div className={styles.container}>
        {userRelatorios.length === 0 ? (
          <p>Nenhum relatório encontrado.</p>
        ) : (
          userRelatorios.map((relatorio) => (
            <div key={relatorio.id} className={styles.card}>
              <p className={styles.text}>Mês: {relatorio.mes}</p>
              <p className={styles.text}>Consumo: {relatorio.volume}</p>
              <button onClick={() => handleEdit(relatorio)}>Editar</button>
              <button onClick={() => handleDelete(relatorio.id)}>Deletar</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ListaRelatorios;
