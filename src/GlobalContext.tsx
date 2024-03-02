import React from 'react';

const questoes = [
  {
    pergunta: 'Qual método é utilizado para criar componentes?',
    options: [
      'React.makeComponent()',
      'React.createComponent()',
      'React.createElement()',
    ],
    resposta: 'React.createElement()',
    id: 'p1',
  },
  {
    pergunta: 'Como importamos um componente externo?',
    options: [
      'import Component from "./Component"',
      'require("./Component")',
      'import "./Component"',
    ],
    resposta: 'import Component from "./Component"',
    id: 'p2',
  },
  {
    pergunta: 'Qual hook não é nativo?',
    options: ['useEffect()', 'useFetch()', 'useCallback()'],
    resposta: 'useFetch()',
    id: 'p3',
  },
  {
    pergunta: 'Qual palavra deve ser utilizada para criarmos um hook?',
    options: ['set', 'get', 'use'],
    resposta: 'use',
    id: 'p4',
  },
];

export type Pergunta = {
  pergunta: string;
  options: string[];
  resposta: string;
  id: string;
};

type PerguntasContext = {
  questoes: Pergunta[];
  perguntaAtual: Pergunta;
  setPerguntaAtual: (pergunta: Pergunta) => void;
  resultado: string[];
  setResultado: (resultado: string[]) => void;
  finish: boolean;
  setFinish: (finish: boolean) => void;
  resultadoCorreto: string[];
  acertos?: string[];
  erros?: string[];
  correcao?: string[];
};

export const GlobalContext = React.createContext<PerguntasContext | null>(null);

export const GlobalStorage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [perguntaAtual, setPerguntaAtual] = React.useState(questoes[0]);
  const [resultado, setResultado] = React.useState<string[]>([]);
  const [finish, setFinish] = React.useState(false);

  const resultadoCorreto = questoes.map((q) => q.resposta);

  let acertos;
  let erros;
  let correcao;

  if (finish) {
    acertos = resultado.filter((value) => resultadoCorreto.includes(value));
    erros = resultado.filter((value) => !resultadoCorreto.includes(value));
    correcao = resultadoCorreto.filter((value) => !resultado.includes(value));
  }

  return (
    <GlobalContext.Provider
      value={{
        questoes,
        resultado,
        setResultado,
        perguntaAtual,
        setPerguntaAtual,
        setFinish,
        finish,
        resultadoCorreto,
        acertos,
        erros,
        correcao,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
