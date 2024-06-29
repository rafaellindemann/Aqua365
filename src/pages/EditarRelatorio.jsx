import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../context/GlobalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EditarRelatorio.module.css';

function EditarRelatorio() {
  const { register, handleSubmit, setValue } = useForm();
  const { relatorios, setRelatorios } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { relatorio } = location.state;

  const [cepLoading, setCepLoading] = useState(false);

  const onSubmit = data => {
    const updatedRelatorio = {
      ...relatorio,
      mes: data.mes,
      volume: data.volume,
      endereco: {
        cep: data.CEP,
        logradouro: data.Logradouro,
        complemento: data.Complemento,
        unidade: data.Unidade,
        bairro: data.Bairro,
        localidade: data.Localidade,
        uf: data.UF,
      },
      descricao: data.descricao,
    };
    setRelatorios(relatorios.map(rel => (rel.id === relatorio.id ? updatedRelatorio : rel)));
    navigate('/lista-relatorios');
  };

  const buscarEndereco = async () => {
    const cep = getValues("CEP");
    if (cep) {
      setCepLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue("Logradouro", data.logradouro);
          setValue("Complemento", data.complemento);
          setValue("Bairro", data.bairro);
          setValue("Localidade", data.localidade);
          setValue("UF", data.uf);
        } else {
          alert("CEP não encontrado");
        }
      } catch (error) {
        alert("Erro ao buscar o CEP");
      } finally {
        setCepLoading(false);
      }
    } else {
      alert("Por favor, insira um CEP válido");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Editar Relatório</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input type="month" defaultValue={relatorio.mes} {...register("mes", { required: true })} />
            <label>Mês</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="number" defaultValue={relatorio.volume} {...register("volume", { required: true })} />
            <label>Volume</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.descricao} {...register("descricao", { required: true })} />
            <label>Descrição</label>
          </div>
          <div className={styles.cepContainer}>
            <input type="text" defaultValue={relatorio.endereco.cep} {...register("CEP", { required: true })} />
            <button type="button" onClick={buscarEndereco} disabled={cepLoading}>
              {cepLoading ? 'Buscando...' : 'Buscar CEP'}
            </button>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.endereco.logradouro} {...register("Logradouro", { required: true })} />
            <label>Logradouro</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.endereco.complemento} {...register("Complemento")} />
            <label>Complemento</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.endereco.unidade} {...register("Unidade")} />
            <label>Unidade</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.endereco.bairro} {...register("Bairro", { required: true })} />
            <label>Bairro</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.endereco.localidade} {...register("Localidade", { required: true })} />
            <label>Localidade</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" defaultValue={relatorio.endereco.uf} {...register("UF", { required: true })} />
            <label>UF</label>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => navigate('/lista-relatorios')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarRelatorio;
