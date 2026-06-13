import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function fazerLogin() {
  try {
    const resposta = await fetch(
      "https://api.serratec.mwmsoftware.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      }
    );

    const dados = await resposta.json();

    console.log(dados);

localStorage.setItem("token", dados.tokenAcesso);

navigate("/home");
  } catch (erro) {
    console.log(erro);
    alert("Erro ao fazer login");
  }
}
  return (
    <section>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br />
      <br />

    <button onClick={fazerLogin}>
      Entrar
    </button>

    </section>
  );
}

export default Login;