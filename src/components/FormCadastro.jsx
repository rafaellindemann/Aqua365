import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../context/GlobalContext';
import styles from './FormCadastro.module.css';

function FormCadastro({ switchToLogin }) {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const { usuarios, addUsuario, setIsLoggedIn, setLoggedUser } = useContext(GlobalContext);
  const [cepLoading, setCepLoading] = useState(false);

  const onSubmit = data => {
    const cpfExistente = usuarios.find(user => user.cpf === data.cpf);
    if (cpfExistente) {
      alert("CPF já cadastrado. Por favor, use outro CPF.");
      return;
    }

    const novoUsuario = {
      ...data,
      id: new Date().getTime(),
      endereco: {
        cep: data.CEP,
        logradouro: data.Logradouro,
        complemento: data.Complemento,
        unidade: data.Unidade,
        bairro: data.Bairro,
        localidade: data.Localidade,
        uf: data.UF,
      }
    };
    addUsuario(novoUsuario);
    alert("Usuário cadastrado com sucesso!");
    // setIsLoggedIn(true);
    // setLoggedUser(novoUsuario);
    switchToLogin();
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
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input type="text" {...register("nome", { required: true })} />
            <label>Nome</label>
            {errors.nome && <p>Nome é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <select {...register("sexo", { required: true })}>
              <option value="">Selecione o sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <label>Sexo</label>
            {errors.sexo && <p>Sexo é obrigatório</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" placeholder="CPF (XXX.XXX.XXX-XX)" {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ })} />
            <label>CPF</label>
            {errors.cpf && <p>CPF inválido ou já cadastrado</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="date" {...register("data_nasc", { required: true })} />
            <label>Data de Nascimento</label>
            {errors.data_nasc && <p>Data de Nascimento é obrigatória</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="text" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            <label>Email</label>
            {errors.email && <p>Email inválido</p>}
          </div>
          <div className={styles.inputContainer}>
            <input type="password" {...register("senha", { required: true })} />
            <label>Senha</label>
            {errors.senha && <p>Senha é obrigatória</p>}
          </div>
          <div className={styles.cepContainer}>
            <div className={styles.inputContainer}>
              <input type="text" {...register("CEP", { required: true })} />
              <label>CEP</label>
              {errors.CEP && <p>CEP é obrigatório</p>}
            </div>
            <button type="button" onClick={buscarEndereco} disabled={cepLoading}>
              {cepLoading ? 'Buscando...' : 'Buscar CEP'}
            </button>
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
          <input type="submit" value="Cadastrar" />
        </form>
        <button onClick={switchToLogin}>Já tem uma conta? Faça login</button>
      </div>
    </div>
  );
}

export default FormCadastro;


