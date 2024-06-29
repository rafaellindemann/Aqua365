import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../context/GlobalContext';
import styles from './CadastroRelatorio.module.css';
import { useNavigate } from 'react-router-dom';

function CadastroRelatorio() {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const { addRelatorio, loggedUser } = useContext(GlobalContext);
  const [cepLoading, setCepLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = data => {
    const novoRelatorio = {
      id: Date.now(), // Gerando um ID único
      mes: data.mes,
      volume: data.volume,
      userID: loggedUser.id,
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
    addRelatorio(novoRelatorio);
    alert("Relatório cadastrado com sucesso!");
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
        <h1>Cadastro de Relatório</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input type="month" {...register("mes", { required: true })} />
            <label>Mês</label>
            {errors.mes && <p>Mês é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="number" {...register("volume", { required: true })} />
            <label>Volume</label>
            {errors.volume && <p>Volume é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("descricao", { required: true })} />
            <label>Descrição</label>
            {errors.descricao && <p>Descrição é obrigatória</p>}
          </div>
          <div className={styles.cepContainer}>
            <input type="text" {...register("CEP", { required: true })} />
            <button type="button" onClick={buscarEndereco} disabled={cepLoading}>
              {cepLoading ? 'Buscando...' : 'Buscar CEP'}
            </button>
            {errors.CEP && <p>CEP é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("Logradouro", { required: true })} />
            <label>Logradouro</label>
            {errors.Logradouro && <p>Logradouro é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("Complemento")} />
            <label>Complemento</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("Unidade")} />
            <label>Unidade</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("Bairro", { required: true })} />
            <label>Bairro</label>
            {errors.Bairro && <p>Bairro é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("Localidade", { required: true })} />
            <label>Localidade</label>
            {errors.Localidade && <p>Localidade é obrigatória</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("UF", { required: true })} />
            <label>UF</label>
            {errors.UF && <p>UF é obrigatória</p>}
          </div>
          <input type="submit" value="Cadastrar Relatório" />
        </form>
      </div>
    </div>
  );
}

export default CadastroRelatorio;
