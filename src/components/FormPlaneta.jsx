function FormPlaneta({
  modeEdit,
  salvarPlaneta,
  fecharModal,
  formPlaneta,
  setFormPlaneta,
}) {
  return (
    <form className="alien-form" onSubmit={salvarPlaneta}>
      <div className="modal-header">
        <h2>{modeEdit ? "Editar" : "Cadastrar"} planeta</h2>

        <button
          type="button"
          className="modal-close"
          onClick={fecharModal}
        >
          X
        </button>
      </div>

      <label>
        Nome
        <input
          type="text"
          value={formPlaneta.nome}
          onChange={(e) =>
            setFormPlaneta({
              ...formPlaneta,
              nome: e.target.value,
            })
          }
          required
        />
      </label>

      <label>
        Galáxia
        <input
          type="text"
          value={formPlaneta.galaxia}
          onChange={(e) =>
            setFormPlaneta({
              ...formPlaneta,
              galaxia: e.target.value,
            })
          }
          required
        />
      </label>

      <label>
        Clima
        <input
          type="text"
          value={formPlaneta.clima}
          onChange={(e) =>
            setFormPlaneta({
              ...formPlaneta,
              clima: e.target.value,
            })
          }
          required
        />
      </label>

      <label>
        Habitável
        <select
          value={formPlaneta.habitavel}
          onChange={(e) =>
            setFormPlaneta({
              ...formPlaneta,
              habitavel: e.target.value === "true",
            })
          }
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>

      <label>
        Descrição
        <input
          type="text"
          value={formPlaneta.descricao}
          onChange={(e) =>
            setFormPlaneta({
              ...formPlaneta,
              descricao: e.target.value,
            })
          }
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit">
          {modeEdit ? "Editar" : "Cadastrar"} planeta
        </button>

        <button
          type="button"
          className="button-secondary"
          onClick={fecharModal}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormPlaneta;