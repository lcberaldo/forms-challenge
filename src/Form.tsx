import React from 'react';
import Step from './Step';
import { GlobalContext } from './GlobalContext';

const Form = () => {
  const [resposta, setResposta] = React.useState('');

  const context = React.useContext(GlobalContext);

  if (!context) return null;

  const { perguntaAtual, finish, erros, acertos, correcao } = context;

  if (!finish) {
    return (
      <Step
        pergunta={perguntaAtual.pergunta}
        options={perguntaAtual.options}
        setValue={setResposta}
        value={resposta}
      />
    );
  }

  return (
    <>
      <h1>Respostas</h1>
      <ul>
        {acertos?.map((acerto, i) => (
          <li key={i}>{acerto} ✅</li>
        ))}
      </ul>

      <h2>Você acertou {acertos?.length} de 4 questões</h2>

      <ul>
        {erros?.map((acerto, i) => (
          <li key={i}>
            {acerto} ❌ -{'>'} Resposta correta:{' '}
            <span style={{ paddingLeft: '10px' }}>
              {correcao && correcao[i]}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Form;
