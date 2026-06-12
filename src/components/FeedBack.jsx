import './Feedback.css'; 

function Feedback({ tipo, mensagem }) {
  if (!mensagem) return null;
  
  const classe = tipo === 'erro' ? 'feedback-erro' : 'feedback-sucesso';
  
  return (
    <div className={`feedback ${classe}`}>
      <p>{mensagem}</p>
    </div>
  );
}

export default Feedback;