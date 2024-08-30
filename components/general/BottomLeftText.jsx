export default function BottomLeftText() {
  return (
    <main className="w-full left-0 bottom-0 absolute">
      <div className="relative left-0 bottom-0">
        <div className="w-[400px] mix-blend-screen items-center pt-3 pb-3 flex justify-center text-center text-3xl font-bold rounded-tr-3xl bg-white ">
          <h1> FRONTEND DEVELOPER</h1>
        </div>
        <div className="mix-blend-screen  w-[500px] relative flex items-center justify-center text-center   rounded-tr-3xl  h-[80px]">
          <div className="absolute  bg-[radial-gradient(circle_at_top_right,_transparent_40px,_#fff_30px)] rotate-6 h-[80px] w-[50px] -top-10 right-16"></div>
          <div className="absolute  bg-[radial-gradient(circle_at_top_right,_transparent_40px,_#fff_30px)]  h-[50px] w-[50px] -bottom-3 -right-10"></div>

          <h1 className="text-4xl  font-bold"> Bruno de Almeida Aseff</h1>
        </div>
      </div>
    </main>
  );
}
