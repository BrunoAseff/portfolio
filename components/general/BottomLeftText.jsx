export default function BottomLeftText() {
  return (
    <main className="w-full left-0 bottom-0 absolute">
      <div className="relative left-0 bottom-0">
        <div class="relative bg-[radial-gradient(circle_at_top_right,_transparent_30px,_#000_30px)] h-[50px] w-[100px] right-0"></div>

        <div className="w-[200px] text-gray-500 items-center flex justify-center text-center text-sm  rounded-tr-3xl bg-white  h-[60px]">
          <p> Textinho bem menor aqui</p>
        </div>
        <div className="w-[400px] mix-blend-screen items-center flex justify-center text-center text-3xl font-bold rounded-tr-3xl bg-white  h-[80px]">
          <h1> FRONTEND DEVELOPER</h1>
        </div>
        <div className=" bg-white  w-[500px] flex items-center justify-center text-center   rounded-tr-3xl  h-[80px]">
          <h1 className="text-4xl   font-bold	 "> Bruno de Almeida Aseff</h1>
        </div>
      </div>
    </main>
  );
}
