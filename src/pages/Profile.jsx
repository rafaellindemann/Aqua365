import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

function Profile() {
  const { loggedUser, setLoggedUser, usuarios, setUsuarios, relatorios, setRelatorios, setIsLoggedIn } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      setValue("nome", loggedUser.nome);
      setValue("email", loggedUser.email);
      setValue("CEP", loggedUser.endereco.cep);
      setValue("Logradouro", loggedUser.endereco.logradouro);
      setValue("Complemento", loggedUser.endereco.complemento);
      setValue("Unidade", loggedUser.endereco.unidade);
      setValue("Bairro", loggedUser.endereco.bairro);
      setValue("Localidade", loggedUser.endereco.localidade);
      setValue("UF", loggedUser.endereco.uf);
    }
  }, [loggedUser, setValue]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = data => {
    const updatedUser = {
      ...loggedUser,
      nome: data.nome,
      email: data.email,
      endereco: {
        cep: data.CEP,
        logradouro: data.Logradouro,
        complemento: data.Complemento || "",
        unidade: data.Unidade || "",
        bairro: data.Bairro,
        localidade: data.Localidade,
        uf: data.UF,
      },
    };

    const updatedUsers = usuarios.map(user =>
      user.id === loggedUser.id ? updatedUser : user
    );

    setUsuarios(updatedUsers);
    setLoggedUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const buscarEndereco = async () => {
    const cep = getValues("CEP");
    if (cep) {
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
      }
    } else {
      alert("Por favor, insira um CEP válido");
    }
  };

  const confirmDeleteUser = () => {
    const userRelatorios = relatorios.filter(rel => rel.userID === loggedUser.id);
    if (userRelatorios.length > 0) {
      alert("Não é possível excluir o usuário. Existem relatórios cadastrados com este ID.");
      return;
    }

    const updatedUsers = usuarios.filter(user => user.id !== loggedUser.id);
    setUsuarios(updatedUsers);
    setLoggedUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleDeleteUser = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(false);
    confirmDeleteUser();
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className={styles.container}>
      <h1>Perfil do Usuário</h1>
      <form className={styles.formPerfil} onSubmit={handleSubmit(handleSave)}>
        <div className={styles.inputContainer}>
          <label>Nome</label>
          <input type="text" {...register("nome", { required: true })} disabled={!isEditing} />
          {errors.nome && <p>Nome é obrigatório</p>}
        </div>
        <div className={styles.inputContainer}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} disabled={!isEditing} />
          {errors.email && <p>Email é obrigatório</p>}
        </div>
        <div className={styles.inputContainer}>
          <label>CEP</label>
          <div className={styles.cepContainer}>
            <input type="text" {...register("CEP", { required: true })} disabled={!isEditing} />
            <button type="button" onClick={buscarEndereco} disabled={!isEditing}>
              Buscar CEP
            </button>
            {errors.CEP && <p>CEP é obrigatório</p>}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Logradouro</label>
          <input type="text" {...register("Logradouro", { required: true })} disabled={!isEditing} />
          {errors.Logradouro && <p>Logradouro é obrigatório</p>}
        </div>
        <div className={styles.inputContainer}>
          <label>Complemento</label>
          <input type="text" {...register("Complemento")} disabled={!isEditing} />
        </div>
        <div className={styles.inputContainer}>
          <label>Unidade</label>
          <input type="text" {...register("Unidade")} disabled={!isEditing} />
        </div>
        <div className={styles.inputContainer}>
          <label>Bairro</label>
          <input type="text" {...register("Bairro", { required: true })} disabled={!isEditing} />
          {errors.Bairro && <p>Bairro é obrigatório</p>}
        </div>
        <div className={styles.inputContainer}>
          <label>Localidade</label>
          <input type="text" {...register("Localidade", { required: true })} disabled={!isEditing} />
          {errors.Localidade && <p>Localidade é obrigatória</p>}
        </div>
        <div className={styles.inputContainer}>
          <label>UF</label>
          <input type="text" {...register("UF", { required: true })} disabled={!isEditing} />
          {errors.UF && <p>UF é obrigatória</p>}
        </div>
        {isEditing ? (
          <>
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <button type="button" onClick={toggleEdit}>Editar</button>
        )}
      </form>
      <button className={styles.deleteButton} onClick={handleDeleteUser}>Excluir Usuário</button>
      
      {showConfirmDelete && (
        <div className={styles.confirmationDialog}>
          <p>Tem certeza que deseja excluir este usuário?</p>
          <button onClick={handleConfirmDelete}>Confirmar</button>
          <button onClick={handleCancelDelete}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
