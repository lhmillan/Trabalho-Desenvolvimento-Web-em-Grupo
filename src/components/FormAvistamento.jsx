import { useEffect, useState } from "react";
import FormAvistamento from "../components/FormAvistamento";
import api from "../services/api";

const url = "/avistamentos";

function Avistamentos() {
  const [avistamentos, setAvistamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);

  const [formAvistamento, setFormAvistamento] = useState({
    titulo: "",
    local: "",
    descricao: "",
    data: "",
    nivelMedo: 1,
  });

  function limparFormulario() {
    setFormAvistamento({
      titulo: "",
      local: "",
      descricao: "",
      data: "",
      nivelMedo: 1,
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

  async function buscarAvistamentos() {
    try {
      setLoading(true);

      const resposta = await api.get(url);

      setAvistamentos(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar avistamentos:", error);
      setMensagem("Erro ao carregar avistamentos.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarAvistamento(event) {
    event.preventDefault();

    try {
      const resposta = await api.post(url, formAvistamento);

      setAvistamentos((listaAtual) => [
        ...listaAtual,
        resposta.data,
      ]);

      setMensagem("Avistamento cadastrado com sucesso!");

      fecharModal();
    } catch (error) {
      console.error("Erro ao cadastrar avistamento:", error);
      setMensagem("Erro ao cadastrar avistamento.");
    }
  }

  async function deletarAvistamento(id) {
    try {
      await api.delete(`${url}/${id}`);

      setAvistamentos((listaAtual) =>
        listaAtual.filter(
          (avistamento) => avistamento.id !== id
        )
      );

      setMensagem("Avistamento excluído com sucesso!");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao excluir avistamento.");
    }
  }

  useEffect(() => {
    buscarAvistamentos();
  }, []);

  return (
    <section>
      <h1>Avistamentos</h1>

      <button
        type="button"
        className="open-modal-button"
        onClick={abrirModalCadastro}
      >
        Cadastrar Avistamento
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormAvistamento
              modeEdit={modeEdit}
              salvarAvistamento={salvarAvistamento}
              fecharModal={fecharModal}
              formAvistamento={formAvistamento}
              setFormAvistamento={setFormAvistamento}
            />
          </div>
        </div>
      )}

      {mensagem && <p>{mensagem}</p>}

      {loading ? (
        <p>Carregando avistamentos...</p>
      ) : (
        <div className="alien-list">
          {avistamentos.map((avistamento) => (
            <article
              className="alien-card"
              key={avistamento.id}
            >
              <h3>{avistamento.titulo}</h3>

              <p>
                <strong>Local:</strong> {avistamento.local}
              </p>

              <p>
                <strong>Descrição:</strong>{" "}
                {avistamento.descricao}
              </p>

              <p>
                <strong>Data:</strong> {avistamento.data}
              </p>

              <p>
                <strong>Nível de Medo:</strong>{" "}
                {avistamento.nivelMedo}
              </p>

              <div className="card-actions">
                <button
                  className="button-excluir"
                  onClick={() =>
                    deletarAvistamento(avistamento.id)
                  }
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Avistamentos;