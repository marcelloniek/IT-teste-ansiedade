"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

const domande = [
  "Provo un senso di oppressione al petto o una sensazione di soffocamento quando penso a situazioni future o a decisioni che devo prendere.",
  "Faccio fatica a controllare pensieri negativi o preoccupazioni che continuano ripetutamente a girarmi per la testa.",
  "Mi sento inquieto(a), irritabile o incapace di rilassarmi, anche nei momenti che dovrebbero essere tranquilli.",
  "Ho serie difficoltà ad addormentarmi oppure mi sveglio spesso durante la notte, preoccupato(a) per situazioni varie.",
  "Evito situazioni o compiti quotidiani per paura eccessiva o per una negativa anticipazione di quello che potrebbe succedere.",
  "Recentemente ho pensato spesso che non vorrei più vivere o che sarebbe meglio sparire per non affrontare tutta questa ansia.", // FLAG
  "Provo sintomi fisici come sudorazione fredda, tremori, nausea o tachicardia in momenti di tensione o nervosismo.",
  "Le mie preoccupazioni interferiscono direttamente con le mie prestazioni lavorative o con i miei rapporti familiari e personali.",
  "Tendo a pensare ossessivamente a cose brutte che potrebbero accadere a me o a persone a me vicine.",
  "Sento che la mia ansia sta peggiorando sempre di più e sta diventando incontrollabile."
];

export default function TestAnsia() {
  const [risposte, setRisposte] = useState(Array(10).fill(0));
  const [risultato, setRisultato] = useState(null);
  const [indiceAttuale, setIndiceAttuale] = useState(0);

  const registraRisposta = (valore) => {
    const nuoveRisposte = [...risposte];
    nuoveRisposte[indiceAttuale] = valore;
    setRisposte(nuoveRisposte);

    if (indiceAttuale < domande.length - 1) {
      setIndiceAttuale(indiceAttuale + 1);
    } else {
      calcolaRisultato(nuoveRisposte);
    }
  };

  const calcolaRisultato = (risposte) => {
    if (risposte[5] >= 3) { // FLAG
      setRisultato("ROSSO");
    } else {
      const somma = risposte.reduce((a, b) => a + b, 0);
      if (somma <= 20) setRisultato("VERDE");
      else if (somma <= 35) setRisultato("GIALLO");
      else setRisultato("ROSSO");
    }
  };

  const riavviaTest = () => {
    setRisposte(Array(10).fill(0));
    setRisultato(null);
    setIndiceAttuale(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!risultato ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{`Test sull'Ansia`}</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              Indica con quale frequenza ciascuna situazione ti accade attualmente:<br />
              <strong>(1) Mai | (2) Raramente | (3) A volte | (4) Frequentemente | (5) Sempre</strong>
            </p>
          </div>

          <p className="mb-4">{domande[indiceAttuale]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const gradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registraRisposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${gradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">Domanda {indiceAttuale + 1} di {domande.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Risultato: {risultato}</h2>
          <img
            src={
              risultato === "VERDE"
                ? "/images/semaforo-verde.png"
                : risultato === "GIALLO"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Semaforo: ${risultato}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {risultato === "VERDE" && (
            <p className="text-center">Gestisci molto bene questo aspetto e sei emotivamente equilibrato(a). Potrai essere di grande aiuto ad altre persone che necessitano sostegno.</p>
          )}
          {risultato === "GIALLO" && (
            <p className="text-center">Ci sono chiari segnali di difficoltà emotive che richiedono attenzione e che, con determinazione e aiuto, possono essere superati.</p>
          )}
          {risultato === "ROSSO" && (
            <p className="text-center">I tuoi problemi emotivi legati a questo tema richiedono necessariamente l'intervento di un professionista. Ti consigliamo di cercare rapidamente l'aiuto di un medico o psicologo.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={riavviaTest}
          >
            Ripeti il test
          </button>
    
        </>
      )}
    </div>
  );
}