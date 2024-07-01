import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../context/GlobalContext';
import styleFormCadastro from './FormCadastro.module.css';

function FormCadastro({ switchToLogin }) {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const { usuarios, addUsuario } = useContext(GlobalContext);
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
    <div className={styleFormCadastro.container}>
      <div className={styleFormCadastro.formWrapper}>
        <h1>Cadastro de Usuário</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styleFormCadastro.inputContainer}>
        <label>Nome</label>
          <input type="text" placeholder="Nome" {...register("nome", { required: true })} />
          {errors.nome && <p className={styleFormCadastro.pErro}>Nome é obrigatório</p>}
        </div>
        <div className={styleFormCadastro.inputContainer}>
        <label>Email</label>
          <select {...register("sexo", { required: true })}>
            <option value="">Selecione o sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.sexo && <p className={styleFormCadastro.pErro}>Sexo é obrigatório</p>}
</div>
<div className={styleFormCadastro.inputContainer}>
        <label>CPF</label>
          <input type="text" placeholder="CPF (XXX.XXX.XXX-XX)" {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ })} />
          {errors.cpf && <p className={styleFormCadastro.pErro}>CPF inválido ou já cadastrado</p>}
</div>
<div className={styleFormCadastro.inputContainer}>
        <label>Data de Nascimento</label>
          <input type="date" placeholder="Data de Nascimento" {...register("data_nasc", { required: true })} />
          {errors.data_nasc && <p className={styleFormCadastro.pErro}>Data de Nascimento é obrigatória</p>}
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Email</label>
          <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <p className={styleFormCadastro.pErro}>Email inválido</p>}
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Senha</label>
          <input type="password" placeholder="Senha" {...register("senha", { required: true })} />
          {errors.senha && <p className={styleFormCadastro.pErro}>Senha é obrigatória</p>}
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>CEP</label>
          <div className={styleFormCadastro.cepContainer}>
            <input type="text" placeholder="CEP" {...register("CEP", { required: true })} />
            <button type="button" onClick={buscarEndereco} disabled={cepLoading}>
              {cepLoading ? 'Buscando...' : 'Buscar CEP'}
            </button>
            {errors.CEP && <p className={styleFormCadastro.pErro}>CEP é obrigatório</p>}
          </div>
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Logradouro</label>
          <input type="text" placeholder="Logradouro" {...register("Logradouro", { required: true })} />
          {errors.Logradouro && <p className={styleFormCadastro.pErro}>Logradouro é obrigatório</p>}
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Complemento</label>
          <input type="text" placeholder="Complemento" {...register("Complemento")} />
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Unidade</label>
          <input type="text" placeholder="Unidade" {...register("Unidade")} />
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Bairro</label>
          <input type="text" placeholder="Bairro" {...register("Bairro", { required: true })} />
          {errors.Bairro && <p className={styleFormCadastro.pErro}>Bairro é obrigatório</p>}
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>Localidade</label>
          <input type="text" placeholder="Localidade" {...register("Localidade", { required: true })} />
          {errors.Localidade && <p className={styleFormCadastro.pErro}>Localidade é obrigatória</p>}
          </div>
<div className={styleFormCadastro.inputContainer}>
        <label>UF</label>
          <input type="text" placeholder="UF" {...register("UF", { required: true })} />
          {errors.UF && <p className={styleFormCadastro.pErro}>UF é obrigatória</p>}
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
        <p className={styleFormCadastro.switchButton} onClick={switchToLogin}>Já tem uma conta? Faça login</p>
      </div>
    </div>
  );
}

export default FormCadastro;
