import { useEffect, useState } from "react";
import FormPlaneta from "../components/FormPlaneta";
import api from "../services/api";

const url = "/planetas";

function Planetas() {
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);

  const [formPlaneta, setFormPlaneta] = useState({
    nome: "",
    galaxia: "",
    clima: "",
    habitavel: true,
    descricao: "",
  });

  function limparFormulario() {
    setFormPlaneta({
      nome: "",
      galaxia: "",
      clima: "",
      habitavel: true,
      descricao: "",
    });
  }

  function fecharModal() {
    setModalAberto(false);
    setModeEdit(false);
    limparFormulario();
  }

  function abrirModalCadastro() {
    setMensagem("");
    setModeEdit(false);
    limparFormulario();
    setModalAberto(true);
  }

  function abrirModalEdicao(planeta) {
    setMensagem("");
    setModeEdit(true);

    setFormPlaneta({
      id: planeta.id,
      nome: planeta.nome ?? "",
      galaxia: planeta.galaxia ?? "",
      clima: planeta.clima ?? "",
      habitavel: planeta.habitavel ?? true,
      descricao: planeta.descricao ?? "",
    });

    setModalAberto(true);
  }

  async function buscarPlanetas() {
    try {
      setLoading(true);

      const resposta = await api.get(url);

      setPlanetas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar planetas:", error);
      setMensagem("Erro ao carregar planetas.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarPlaneta(event) {
    event.preventDefault();

    try {
      const resposta = await api.post(url, formPlaneta);

      setPlanetas((listaAtual) => [
        ...listaAtual,
        resposta.data,
      ]);

      setMensagem("Planeta cadastrado com sucesso!");

      fecharModal();
    } catch (error) {
      console.error("Erro ao cadastrar planeta:", error);
      setMensagem("Erro ao cadastrar planeta.");
    }
  }

  async function editarPlaneta(event) {
    event.preventDefault();

    try {
      const resposta = await api.put(
        `${url}/${formPlaneta.id}`,
        formPlaneta
      );

      const planetaAtualizado =
        resposta.data ?? formPlaneta;

      setPlanetas((listaAtual) =>
        listaAtual.map((planeta) =>
          planeta.id === formPlaneta.id
            ? {
                ...planeta,
                ...planetaAtualizado,
              }
            : planeta
        )
      );

      setMensagem("Planeta editado com sucesso!");

      fecharModal();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao editar planeta.");
    }
  }

  async function deletarPlaneta(id) {
    try {
      await api.delete(`${url}/${id}`);

      setPlanetas((listaAtual) =>
        listaAtual.filter(
          (planeta) => planeta.id !== id
        )
      );

      setMensagem("Planeta excluído com sucesso!");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao excluir planeta.");
    }
  }

  useEffect(() => {
    buscarPlanetas();
  }, []);

  return (
    <section>
      <h1>Planetas</h1>

      <button
        type="button"
        className="open-modal-button"
        onClick={abrirModalCadastro}
      >
        Cadastrar Planeta
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormPlaneta
              modeEdit={modeEdit}
              salvarPlaneta={
                modeEdit
                  ? editarPlaneta
                  : salvarPlaneta
              }
              fecharModal={fecharModal}
              formPlaneta={formPlaneta}
              setFormPlaneta={setFormPlaneta}
            />
          </div>
        </div>
      )}

      {mensagem && <p>{mensagem}</p>}

      {loading ? (
        <p>Carregando planetas...</p>
      ) : (
        <div className="alien-list">
          {planetas.map((planeta) => (
            <article
              className="alien-card"
              key={planeta.id}
            >
              <h3>{planeta.nome}</h3>

              <p>
                <strong>Galáxia:</strong>{" "}
                {planeta.galaxia}
              </p>

              <p>
                <strong>Clima:</strong>{" "}
                {planeta.clima}
              </p>

              <p>
                <strong>Habitável:</strong>{" "}
                {planeta.habitavel ? "Sim" : "Não"}
              </p>

              <p>
                <strong>Descrição:</strong>{" "}
                {planeta.descricao}
              </p>

              <div className="card-actions">
                <button
                  className="button-excluir"
                  onClick={() =>
                    deletarPlaneta(planeta.id)
                  }
                >
                  Excluir
                </button>

                <button
                  className="button-secondary"
                  onClick={() =>
                    abrirModalEdicao(planeta)
                  }
                >
                  Editar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Planetas;