export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/background3.jpg")' }}
    >
      <nav className="absolute top-6 left-6 flex bg-white/50 rounded-xl shadow-xl  backdrop-blur-[12.6px] border border-white/30">
        <a href="/" className="p-4 text-md  text-black">
          Sobre mim
        </a>
        <a href="/projetos" className="p-4 text-md  text-black">
          Projetos
        </a>
        <a href="/contato" className="p-4 text-md  text-black">
          Contato
        </a>
      </nav>
    </main>
  );
}
