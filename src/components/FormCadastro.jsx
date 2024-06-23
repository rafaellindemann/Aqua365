import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function FormCadastro({ switchToLogin }) {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const { addUsuario } = useContext(GlobalContext);
  const [cepLoading, setCepLoading] = useState(false);

  const onSubmit = data => {
    // Adicionar o novo usuário
    const novoUsuario = {
      ...data,
      id: new Date().getTime(), // Gerar um ID único
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
    console.log(novoUsuario);
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
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nome" {...register("nome", { required: true })} />
        {errors.nome && <p>Nome é obrigatório</p>}

        <select {...register("sexo", { required: true })}>
          <option value="">Selecione o sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.sexo && <p>Sexo é obrigatório</p>}

        <input type="text" placeholder="CPF" {...register("cpf", { required: true })} />
        {errors.cpf && <p>CPF é obrigatório</p>}

        <input type="date" placeholder="Data de Nascimento" {...register("data_nasc", { required: true })} />
        {errors.data_nasc && <p>Data de Nascimento é obrigatória</p>}

        <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <p>Email inválido</p>}

        <input type="password" placeholder="Senha" {...register("senha", { required: true })} />
        {errors.senha && <p>Senha é obrigatória</p>}

        <div>
          <input type="text" placeholder="CEP" {...register("CEP", { required: true })} />
          <button type="button" onClick={buscarEndereco} disabled={cepLoading}>
            {cepLoading ? 'Buscando...' : 'Buscar CEP'}
          </button>
          {errors.CEP && <p>CEP é obrigatório</p>}
        </div>

        <input type="text" placeholder="Logradouro" {...register("Logradouro", { required: true })} />
        {errors.Logradouro && <p>Logradouro é obrigatório</p>}

        <input type="text" placeholder="Complemento" {...register("Complemento")} />

        <input type="text" placeholder="Unidade" {...register("Unidade")} />

        <input type="text" placeholder="Bairro" {...register("Bairro", { required: true })} />
        {errors.Bairro && <p>Bairro é obrigatório</p>}

        <input type="text" placeholder="Localidade" {...register("Localidade", { required: true })} />
        {errors.Localidade && <p>Localidade é obrigatória</p>}

        <input type="text" placeholder="UF" {...register("UF", { required: true })} />
        {errors.UF && <p>UF é obrigatória</p>}

        <input type="submit" />
      </form>
      <button onClick={switchToLogin}>Já tem uma conta? Faça login</button>
    </div>
  );
}

export default FormCadastro;
