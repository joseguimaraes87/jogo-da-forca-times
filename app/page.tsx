export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-black">
      <h1 className="text-4xl font-bold">Seu Nome</h1>
      <p className="mt-2 text-lg">Estudante de Ciência da Computação</p>

      <div className="mt-6 space-y-2 text-center">
        <p>📚 UNICAP</p>
        <p>💻 Next.js | C | Java</p>
        <p>🚀 Em busca do primeiro estágio</p>
      </div>

      <a
        href="/forca"
        className="mt-8 px-6 py-3 bg-black text-white rounded-full"
      >
        Jogar Forca
      </a>
    </main>
  );
}