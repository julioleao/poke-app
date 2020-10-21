import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "../styles.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState('');

  const { register, handleSubmit, errors } = useForm();

  function changeForm(e) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  function msg(str){
    setMessage(str);
  }

  function submitForm(e) {
    const url = "https://reqres.in/api/register";

    Axios.post(url, {
      email: form.email,
      password: form.password,
    })
      .then((res) => {
        console.log(res.data);
        msg('Usuário registrado com sucesso');
        //alert("Registrado com sucesso!!");
      })
      .catch(() => {
        msg('Falha ao registrar! Verifique os campos e tente novamente.')
      });

    console.log(form);

    setForm({ email: "", password: "" });
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitForm)}
      style={{
        width: 350,
        margin: "40px auto",
      }}
    >
      <h2 className="text-center">Registrar</h2>
      <div className="form-group">
      <label>E-mail</label>

        <input
          placeholder="Ex. eve.holt@reqres.in"
          onChange={changeForm}
          name="email"
          className={"form-control"}
          value={form.email}
          ref={register({
            required: "Entre com seu e-mail",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Entre com um e-mail válido",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <div className="invalid-feedback">Email inválido</div>
      </div>

      <div className="form-group">
      <label>Senha</label>

        <input
          placeholder="Ex. pistol"
          onChange={changeForm}
          name="password"
          className={"form-control"}
          type="password"
          value={form.password}
          ref={register({
            required: "Entre com sua senha",
            minLength: {
              value: 4,
              message: "Senha muito curta",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      

      <div className="form-group">
        <button className="btn btn-primary btn-block">Registrar-se</button>
      </div>
      <p className="alert-warning align-self-center">{message}</p>
    </form>
  );
}
