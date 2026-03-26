"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#FDF5E6] text-[#4A3728] p-6">
      
      {/* Card Principal */}
      <section className="bg-[#FAF0E6] border-2 border-[#D2B48C] p-8 md:p-12 rounded-[40px] shadow-xl flex flex-col items-center max-w-lg w-full text-center">
        
        {/* Círculo com Iniciais */}
        <div className="w-24 h-24 bg-[#5D4037] text-[#FAF0E6] rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-md border-4 border-[#D2B48C]">
          JG
        </div>

        <h1 className="text-4xl font-serif font-bold tracking-tight text-[#5D4037]">
          José Guimarães
        </h1>
        
        <div className="h-1 w-20 bg-[#D2B48C] rounded-full mt-3 mb-4"></div>
        
        <p className="text-[#8B4513] font-bold uppercase tracking-widest text-sm mb-10">
          Estudante de Ciência da Computação
        </p>

        {/* Retângulos de Informação Centralizados */}
        <div className="w-full space-y-4 mb-10">
          
          <div className="bg-[#EEDC82]/10 p-4 rounded-2xl border border-[#D2B48C]/30 flex flex-col items-center justify-center">
            <p className="text-[10px] uppercase font-black text-[#D2B48C] tracking-[0.2em] mb-1">
              Instituição
            </p>
            <p className="font-bold text-[#3E2723]">
              UNICAP
            </p>
          </div>


          <div className="bg-[#EEDC82]/10 p-4 rounded-2xl border border-[#D2B48C]/30 flex flex-col items-center justify-center">
            <p className="text-[10px] uppercase font-black text-[#D2B48C] tracking-[0.2em] mb-1">
              Objetivo
            </p>
            <p className="font-bold text-[#3E2723]">
              Busca de Estágio
            </p>
          </div>

        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link
            href="/forca"
            className="bg-[#5D4037] hover:bg-[#3E2723] text-[#FAF0E6] px-8 py-4 rounded-full font-bold uppercase tracking-widest shadow-lg transition-all active:scale-95 text-center"
          >
            Jogar Forca
          </Link>
          
          <a
            href="https://github.com/joseguimaraes87"
            target="_blank"
            className="bg-[#D2B48C] hover:bg-[#C19A6B] text-[#3E2723] px-8 py-4 rounded-full font-bold uppercase tracking-widest shadow-md border-b-4 border-[#A0522D] transition-all active:border-b-0 active:translate-y-1 text-center"
          >
            Meu GitHub
          </a>
        </div>

      </section>

      <footer className="mt-12 text-[#8B4513]/60 text-[10px] font-bold uppercase tracking-[0.5em]">
        Recife, PE - Brasil • 2026
      </footer>
    </main>
  );
}