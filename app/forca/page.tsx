"use client"
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import confetti from 'canvas-confetti';

// Lista de palavras (Times)
const PALAVRAS = [
  "SPORT", "FLAMENGO", "PALMEIRAS", "CORINTHIANS", "SAO PAULO", "SANTOS",
  "GREMIO", "INTERNACIONAL", "CRUZEIRO", "ATLETICO", "BAHIA", "VITORIA",
  "CEARA", "FORTALEZA", "NAUTICO", "SANTA CRUZ", "BOTAFOGO", "VASCO",
  "FLUMINENSE", "JUVENTUDE", "GOIAS", "CORITIBA", "AMERICA", "CHAPECOENSE",
  "BRAGANTINO", "MIRASSOL", "PONTE PRETA", "GUARANI", "CSA", "ABC"
];

// Componente Visual da Forca (SVG)
const DesenhoForca = ({ erros }: { erros: number }) => {
  const corLinha = "#4A3728"; 
  const partesCorpo = [
    <circle key="cabeça" cx="200" cy="80" r="20" stroke={corLinha} strokeWidth="4" fill="none" />,
    <line key="corpo" x1="200" y1="100" x2="200" y2="150" stroke={corLinha} strokeWidth="4" />,
    <line key="bracoE" x1="200" y1="120" x2="170" y2="140" stroke={corLinha} strokeWidth="4" />,
    <line key="bracoD" x1="200" y1="120" x2="230" y2="140" stroke={corLinha} strokeWidth="4" />,
    <line key="pernaE" x1="200" y1="150" x2="180" y2="190" stroke={corLinha} strokeWidth="4" />,
    <line key="pernaD" x1="200" y1="150" x2="220" y2="190" stroke={corLinha} strokeWidth="4" />,
  ];

  return (
    <svg height="230" width="250" viewBox="0 0 250 250" className="mx-auto">
      {/* Estrutura da Forca */}
      <line x1="20" y1="230" x2="150" y2="230" stroke={corLinha} strokeWidth="4" />
      <line x1="85" y1="230" x2="85" y2="20" stroke={corLinha} strokeWidth="4" />
      <line x1="85" y1="20" x2="200" y2="20" stroke={corLinha} strokeWidth="4" />
      <line x1="200" y1="20" x2="200" y2="60" stroke={corLinha} strokeWidth="4" />
      {/* Partes do boneco que aparecem conforme os erros */}
      {partesCorpo.slice(0, erros)}
    </svg>
  );
};

export default function Forca() {
  const [palavra, setPalavra] = useState("");
  const [letrasUsadas, setLetrasUsadas] = useState<string[]>([]);
  const [erros, setErros] = useState(0);
  const maxErros = 6;

  // Função para sortear nova palavra e resetar estados
  const iniciarJogo = useCallback(() => {
    const random = PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
    setPalavra(random);
    setLetrasUsadas([]);
    setErros(0);
  }, []);

  useEffect(() => {
    iniciarJogo();
  }, [iniciarJogo]);

  // Lógica de vitória
  const venceu = palavra !== "" && palavra.split("").every((l) => l === " " || letrasUsadas.includes(l));
  const perdeu = erros >= maxErros;

  // EFEITO DE CONFETE AO VENCER
  useEffect(() => {
    if (venceu) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5D4037', '#D2B48C', '#6B8E23'] // Cores combinando com seu tema
      });
    }
  }, [venceu]);

  // Função para processar a letra escolhida
  const chutarLetra = useCallback((letra: string) => {
    const l = letra.toUpperCase();
    if (!/^[A-Z]$/.test(l) || letrasUsadas.includes(l) || erros >= maxErros || venceu) return;
    
    setLetrasUsadas((prev) => [...prev, l]);
    if (!palavra.includes(l)) {
      setErros((prev) => prev + 1);
    }
  }, [letrasUsadas, erros, palavra, venceu]);

  // Escuta o teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => chutarLetra(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chutarLetra]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#FDF5E6] text-[#4A3728] p-4">
      
      <div className="bg-[#FAF0E6] border-2 border-[#D2B48C] p-6 md:p-10 rounded-[40px] shadow-xl flex flex-col items-center max-w-2xl w-full">
        
        <header className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-[#5D4037]">
            Jogo da Forca
          </h1>
          <div className="h-1 w-20 bg-[#D2B48C] rounded-full mt-2"></div>
        </header>

        <section className="flex flex-col items-center w-full mb-8">
          <div className="bg-[#EEDC82]/10 p-6 rounded-3xl border border-[#D2B48C]/30 mb-8 w-full max-w-sm">
            <DesenhoForca erros={erros} />
          </div>

          <span className="text-sm font-bold text-[#8B4513] uppercase tracking-[0.4em] mb-6">
            Adivinhe o Time
          </span>

          {/* Visualização da Palavra */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {palavra.split("").map((letra, i) => (
              <div 
                key={i} 
                className={`w-8 h-12 flex items-center justify-center ${
                  letra === " " ? "border-b-0 w-4" : "border-b-4 border-[#3E2723]"
                }`}
              >
                <span className="text-3xl font-mono font-bold uppercase text-[#3E2723]">
                  {letra === " " ? "" : (letrasUsadas.includes(letra) ? letra : "")}
                </span>
              </div>
            ))}
          </div>

          {/* Contador de Tentativas */}
          <div className="bg-[#5D4037] px-8 py-3 rounded-full shadow-lg">
            <span className="text-[#FAF0E6] text-sm font-bold uppercase tracking-widest">
              {maxErros - erros} Tentativas Restantes
            </span>
          </div>
        </section>

        {/* Teclado Virtual */}
        <div className="flex flex-col gap-3 w-full items-center mb-8">
          {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((linha, idx) => (
            <div key={idx} className="flex gap-2 w-full justify-center flex-wrap">
              {linha.split("").map((letra) => {
                const jaUsou = letrasUsadas.includes(letra);
                const correta = jaUsou && palavra.includes(letra);

                return (
                  <button
                    key={letra}
                    disabled={jaUsou || venceu || perdeu}
                    onClick={() => chutarLetra(letra)}
                    className={`flex-1 min-w-[35px] max-w-[45px] h-12 md:h-14 rounded-xl font-bold transition-all duration-150 shadow-md border-b-4 
                      ${!jaUsou 
                        ? "bg-[#D2B48C] border-[#A0522D] text-[#3E2723] hover:bg-[#C19A6B] active:border-b-0 active:translate-y-1" 
                        : correta 
                          ? "bg-[#6B8E23] border-[#556B2F] text-white" 
                          : "bg-[#BC8F8F]/40 border-transparent text-[#8B4513]/50 cursor-not-allowed opacity-60"}
                    `}
                  >
                    {letra}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mensagens e Botões */}
        <div className="flex flex-col items-center gap-4 w-full">
          {(venceu || perdeu) && (
            <div className={`p-4 rounded-2xl font-bold text-center w-full animate-in fade-in zoom-in duration-300 ${
              venceu ? "bg-[#6B8E23]/20 text-[#3A4D13]" : "bg-[#CD5C5C]/20 text-[#8B0000]"
            }`}>
              {venceu ? " Parabéns! Você acertou: " + palavra : ` Game Over! O time era: ${palavra}`}
            </div>
          )}
          
          <button
            onClick={iniciarJogo}
            className="bg-[#5D4037] hover:bg-[#3E2723] text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl transition-all active:scale-95 w-full md:w-auto"
          >
            {venceu || perdeu ? "Próxima Partida" : "Reiniciar Jogo"}
          </button>

          <Link href="/" className="w-full md:w-auto text-center">
            <button
              className="border-2 border-[#5D4037] text-[#5D4037] hover:bg-[#5D4037] hover:text-white px-12 py-3 rounded-full font-bold uppercase tracking-widest transition-all active:scale-95 w-full"
            >
              Voltar ao Início
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}