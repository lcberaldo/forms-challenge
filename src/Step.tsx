import React, { FormEvent } from 'react';
import Radio from './Radio';
import { GlobalContext, Pergunta } from './GlobalContext';

type StepProps = {
  value: string;
  setValue: (value: string) => void;
} & Pick<Pergunta, 'pergunta' | 'options'>;

const Step = ({ pergunta, options, value, setValue }: StepProps) => {
  const [error, setError] = React.useState('');

  const context = React.useContext(GlobalContext);

  if (!context) return null;

  const {
    resultado,
    setResultado,
    questoes,
    perguntaAtual,
    setPerguntaAtual,
    setFinish,
  } = context;

  function apenasNumeros(string: string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
  }

  function handleStep(e: FormEvent) {
    e.preventDefault();

    if (value) {
      setResultado([...resultado, value]);
      setError('');
      setValue('');

      const idProxima = apenasNumeros(perguntaAtual.id) + 1;
      const pergunta = questoes.find((q) => q.id === `p${idProxima}`);

      if (pergunta) {
        setPerguntaAtual(pergunta);
      } else {
        setFinish(true);
      }
    } else {
      setError('Escolha uma opção');
    }
  }
  return (
    <>
      <h1>{pergunta}</h1>

      <form onSubmit={handleStep}>
        <Radio options={options} value={value} setValue={setValue} />
        {error && (
          <p style={{ marginTop: '0', marginLeft: '20px', color: 'red' }}>
            {error}
          </p>
        )}

        <button style={{ marginTop: '20px' }}>Próximo</button>
      </form>
    </>
  );
};

export default Step;
