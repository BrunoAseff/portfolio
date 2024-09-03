import { Rnd } from "react-rnd";

export default function AboutMeTab({ defaultPosition }) {
  return (
    <Rnd
      className="flex-col min-w-20 max-w-[40rem] p-8 relative shadow-xl bg-white/20  backdrop-blur-[20px] border border-white/40 rounded-xl"
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,

        width: "500px",
      }}
      minHeight="430px"
      minWidth="400px"
      maxHeight="3000px"
      maxWidth="3000px"
    >
      <div className="flex">
        <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-red-400 absolute top-4 left-4" />
        <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-yellow-400 absolute top-4 left-10" />
        <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-green-400 absolute top-4 left-16" />
      </div>
      <div className="flex gap-1 text-xl font-semibold mt-6 text-black">
        <p>Quem eu sou</p>
      </div>
      <div className="items-center justify-center w-full">
        <p>
          Sou programador e estudante de Sistemas para Internet na Univali.{" "}
          <br />
          Tenho afinidade tanto com o desenvolvimento back-end quanto front-end,
          mas tenho mais conhecimento em front-end.
          <br />
          Tenho interesse genuíno por linguística e gosto de estudar as
          diferentes formas de se comunicar, seja através de códigos ou
          palavras.
        </p>
      </div>
    </Rnd>
  );
}
