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
    setIsLoggedIn(true);
    setLoggedUser(novoUsuario);
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



// import React, { useState, useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { GlobalContext } from '../context/GlobalContext';
// import styles from './FormCadastro.module.css';

// function FormCadastro({ switchToLogin }) {
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//   const { usuarios, addUsuario } = useContext(GlobalContext);
//   const [cepLoading, setCepLoading] = useState(false);

//   const onSubmit = data => {
//     // Verificar se o CPF já existe
//     const cpfExistente = usuarios.find(user => user.cpf === data.cpf);
//     if (cpfExistente) {
//       alert("CPF já cadastrado. Por favor, use outro CPF.");
//       return;
//     }

//     // Adicionar o novo usuário
//     const novoUsuario = {
//       ...data,
//       id: new Date().getTime(), // Gerar um ID único
//       endereco: {
//         cep: data.CEP,
//         logradouro: data.Logradouro,
//         complemento: data.Complemento,
//         unidade: data.Unidade,
//         bairro: data.Bairro,
//         localidade: data.Localidade,
//         uf: data.UF,
//       }
//     };
//     addUsuario(novoUsuario);
//     alert("Usuário cadastrado com sucesso!");
//     switchToLogin();
//   };

//   const buscarEndereco = async () => {
//     const cep = getValues("CEP");
//     if (cep) {
//       setCepLoading(true);
//       try {
//         const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//         const data = await response.json();
//         if (!data.erro) {
//           setValue("Logradouro", data.logradouro);
//           setValue("Complemento", data.complemento);
//           setValue("Bairro", data.bairro);
//           setValue("Localidade", data.localidade);
//           setValue("UF", data.uf);
//         } else {
//           alert("CEP não encontrado");
//         }
//       } catch (error) {
//         alert("Erro ao buscar o CEP");
//       } finally {
//         setCepLoading(false);
//       }
//     } else {
//       alert("Por favor, insira um CEP válido");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formWrapper}>
//         <h1>Cadastro</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="nome" 
//               className={`${styles.input} ${errors.nome ? styles.inputError : ''}`} 
//               {...register("nome", { required: true })} 
//             />
//             <label htmlFor="nome" className={styles.label}>Nome</label>
//             {errors.nome && <p className={styles.errorMessage}>Nome é obrigatório</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <select 
//               id="sexo" 
//               className={`${styles.input} ${errors.sexo ? styles.inputError : ''}`} 
//               {...register("sexo", { required: true })} 
//             >
//               <option value="">Selecione o sexo</option>
//               <option value="Masculino">Masculino</option>
//               <option value="Feminino">Feminino</option>
//               <option value="Outro">Outro</option>
//             </select>
//             <label htmlFor="sexo" className={styles.label}>Sexo</label>
//             {errors.sexo && <p className={styles.errorMessage}>Sexo é obrigatório</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="cpf" 
//               className={`${styles.input} ${errors.cpf ? styles.inputError : ''}`} 
//               placeholder="XXX.XXX.XXX-XX"
//               {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ })} 
//             />
//             <label htmlFor="cpf" className={styles.label}>CPF</label>
//             {errors.cpf && <p className={styles.errorMessage}>CPF inválido ou já cadastrado</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="date" 
//               id="data_nasc" 
//               className={`${styles.input} ${errors.data_nasc ? styles.inputError : ''}`} 
//               {...register("data_nasc", { required: true })} 
//             />
//             <label htmlFor="data_nasc" className={styles.label}>Data de Nascimento</label>
//             {errors.data_nasc && <p className={styles.errorMessage}>Data de Nascimento é obrigatória</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="email" 
//               className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
//               {...register("email", { required: true, pattern: /^\S+@\S+$/i })} 
//             />
//             <label htmlFor="email" className={styles.label}>Email</label>
//             {errors.email && <p className={styles.errorMessage}>Email inválido</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="password" 
//               id="senha" 
//               className={`${styles.input} ${errors.senha ? styles.inputError : ''}`} 
//               {...register("senha", { required: true })} 
//             />
//             <label htmlFor="senha" className={styles.label}>Senha</label>
//             {errors.senha && <p className={styles.errorMessage}>Senha é obrigatória</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="CEP" 
//               className={`${styles.input} ${errors.CEP ? styles.inputError : ''}`} 
//               {...register("CEP", { required: true })} 
//             />
//             <label htmlFor="CEP" className={styles.label}>CEP</label>
//             <button 
//               type="button" 
//               className={styles.button} 
//               onClick={buscarEndereco} 
//               disabled={cepLoading}
//             >
//               {cepLoading ? 'Buscando...' : 'Buscar CEP'}
//             </button>
//             {errors.CEP && <p className={styles.errorMessage}>CEP é obrigatório</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="Logradouro" 
//               className={`${styles.input} ${errors.Logradouro ? styles.inputError : ''}`} 
//               {...register("Logradouro", { required: true })} 
//             />
//             <label htmlFor="Logradouro" className={styles.label}>Logradouro</label>
//             {errors.Logradouro && <p className={styles.errorMessage}>Logradouro é obrigatório</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="Complemento" 
//               className={`${styles.input}`} 
//               {...register("Complemento")} 
//             />
//             <label htmlFor="Complemento" className={styles.label}>Complemento</label>
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="Unidade" 
//               className={`${styles.input}`} 
//               {...register("Unidade")} 
//             />
//             <label htmlFor="Unidade" className={styles.label}>Unidade</label>
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="Bairro" 
//               className={`${styles.input} ${errors.Bairro ? styles.inputError : ''}`} 
//               {...register("Bairro", { required: true })} 
//             />
//             <label htmlFor="Bairro" className={styles.label}>Bairro</label>
//             {errors.Bairro && <p className={styles.errorMessage}>Bairro é obrigatório</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="Localidade" 
//               className={`${styles.input} ${errors.Localidade ? styles.inputError : ''}`} 
//               {...register("Localidade", { required: true })} 
//             />
//             <label htmlFor="Localidade" className={styles.label}>Localidade</label>
//             {errors.Localidade && <p className={styles.errorMessage}>Localidade é obrigatória</p>}
//           </div>

//           <div className={styles.inputWrapper}>
//             <input 
//               type="text" 
//               id="UF" 
//               className={`${styles.input} ${errors.UF ? styles.inputError : ''}`} 
//               {...register("UF", { required: true })} 
//             />
//             <label htmlFor="UF" className={styles.label}>UF</label>
//             {errors.UF && <p className={styles.errorMessage}>UF é obrigatória</p>}
//           </div>

//           <input type="submit" className={styles.submitButton} value="Cadastrar" />
//         </form>
//         <button onClick={switchToLogin} className={styles.switchButton}>Já tem uma conta? Faça login</button>
//       </div>
//     </div>
//   );
// }

// export default FormCadastro;


// import React, { useState, useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { GlobalContext } from '../context/GlobalContext';
// import styles from './FormCadastro.module.css';

// function FormCadastro({ switchToLogin }) {
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
//   const { usuarios, addUsuario } = useContext(GlobalContext);
//   const [cepLoading, setCepLoading] = useState(false);

//   const onSubmit = data => {
//     // Verificar se o CPF já existe
//     const cpfExistente = usuarios.find(user => user.cpf === data.cpf);
//     if (cpfExistente) {
//       alert("CPF já cadastrado. Por favor, use outro CPF.");
//       return;
//     }

//     // Adicionar o novo usuário
//     const novoUsuario = {
//       ...data,
//       id: new Date().getTime(), // Gerar um ID único
//       endereco: {
//         cep: data.CEP,
//         logradouro: data.Logradouro,
//         complemento: data.Complemento,
//         unidade: data.Unidade,
//         bairro: data.Bairro,
//         localidade: data.Localidade,
//         uf: data.UF,
//       }
//     };
//     addUsuario(novoUsuario);
//     alert("Usuário cadastrado com sucesso!");
//     switchToLogin();
//   };

//   const buscarEndereco = async () => {
//     const cep = getValues("CEP");
//     if (cep) {
//       setCepLoading(true);
//       try {
//         const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//         const data = await response.json();
//         if (!data.erro) {
//           setValue("Logradouro", data.logradouro);
//           setValue("Complemento", data.complemento);
//           setValue("Bairro", data.bairro);
//           setValue("Localidade", data.localidade);
//           setValue("UF", data.uf);
//         } else {
//           alert("CEP não encontrado");
//         }
//       } catch (error) {
//         alert("Erro ao buscar o CEP");
//       } finally {
//         setCepLoading(false);
//       }
//     } else {
//       alert("Por favor, insira um CEP válido");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formWrapper}>
//         <h1>Cadastro</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input type="text" placeholder="Nome" {...register("nome", { required: true })} />
//           {errors.nome && <p>Nome é obrigatório</p>}

//           <select {...register("sexo", { required: true })}>
//             <option value="">Selecione o sexo</option>
//             <option value="Masculino">Masculino</option>
//             <option value="Feminino">Feminino</option>
//             <option value="Outro">Outro</option>
//           </select>
//           {errors.sexo && <p>Sexo é obrigatório</p>}

//           <input type="text" placeholder="CPF (XXX.XXX.XXX-XX)" {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ })} />
//           {errors.cpf && <p>CPF inválido ou já cadastrado</p>}

//           <input type="date" placeholder="Data de Nascimento" {...register("data_nasc", { required: true })} />
//           {errors.data_nasc && <p>Data de Nascimento é obrigatória</p>}

//           <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
//           {errors.email && <p>Email inválido</p>}

//           <input type="password" placeholder="Senha" {...register("senha", { required: true })} />
//           {errors.senha && <p>Senha é obrigatória</p>}

//           <div className={styles.cepContainer}>
//             <input type="text" placeholder="CEP" {...register("CEP", { required: true })} />
//             <button type="button" onClick={buscarEndereco} disabled={cepLoading}>
//               {cepLoading ? 'Buscando...' : 'Buscar CEP'}
//             </button>
//             {errors.CEP && <p>CEP é obrigatório</p>}
//           </div>

//           <input type="text" placeholder="Logradouro" {...register("Logradouro", { required: true })} />
//           {errors.Logradouro && <p>Logradouro é obrigatório</p>}

//           <input type="text" placeholder="Complemento" {...register("Complemento")} />

//           <input type="text" placeholder="Unidade" {...register("Unidade")} />

//           <input type="text" placeholder="Bairro" {...register("Bairro", { required: true })} />
//           {errors.Bairro && <p>Bairro é obrigatório</p>}

//           <input type="text" placeholder="Localidade" {...register("Localidade", { required: true })} />
//           {errors.Localidade && <p>Localidade é obrigatória</p>}

//           <input type="text" placeholder="UF" {...register("UF", { required: true })} />
//           {errors.UF && <p>UF é obrigatória</p>}

//           <input type="submit" value="Cadastrar" />
//         </form>
//         <button onClick={switchToLogin}>Já tem uma conta? Faça login</button>
//       </div>
//     </div>
//   );
// }

// export default FormCadastro;



