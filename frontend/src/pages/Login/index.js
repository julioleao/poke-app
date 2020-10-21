import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();
  const { register, handleSubmit, errors } = useForm();

  function changeForm(e) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }
  function msg(str){
    setMessage(str);
  }

  function submitForm() {
    const url = "https://reqres.in/api/login";

    Axios.post(url, {
      email: form.email,
      password: form.password,
    })
      .then((res) => {
        console.log(res.data);
        msg("Login efetuado com sucesso!!");
        localStorage.setItem("token", res.data.token);
        window.location.pathname = "/list";
      })
      .catch(() => {
        msg("Usuário não encontrado!");
      });

    console.log(form);

    setForm({ email: "", password: "" });
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(submitForm)}
        style={{
          width: 350,
          margin: "40px auto",
        }}
      >
        <h2 className="text-center">Login</h2>
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
        </div>
        <label>Senha</label>

        <div className="form-group">
          <input
            placeholder="Ex. cityslicka"
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
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block">Entrar</button>
        </div>
        <p className="alert-warning align-self-center">{message}</p>
      </form>
    </div>
  );
}
