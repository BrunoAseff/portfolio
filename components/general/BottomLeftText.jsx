export default function BottomLeftText() {
  return (
    <main className="w-full left-0 bottom-0 absolute">
      <div className="relative left-0 bottom-0">
        <div className="w-[200px] text-gray-500 items-center flex justify-center text-center text-sm  rounded-tr-2xl bg-white  h-[60px]">
          Textinho bem menor aqui
        </div>
        <div className="w-[400px] items-center flex justify-center text-center text-2xl font-bold rounded-tr-2xl bg-white  h-[80px]">
          Algum texto escrito aqui
        </div>
        <div className="w-[600px] bg-white flex items-center justify-center text-center text-2xl  rounded-tr-2xl  h-[80px]">
          {" "}
          Algum texto escrito um pouco maior
        </div>
      </div>
    </main>
  );
}
