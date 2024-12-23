import { Rnd } from "react-rnd";

export default function AboutMeTab({ state, onClose, onMinimize }) {
  if (state === "minimized") return null;

  return (
    <Rnd
      className="flex-col min-w-20 max-w-[40rem] p-8 text-black relative shadow-xl bg-white/20 backdrop-blur-[20px] border border-white/40 rounded-xl"
      default={{
        x: -600,
        y: -200,
        width: "500px",
      }}
      minHeight="430px"
      minWidth="400px"
      maxHeight="3000px"
      maxWidth="3000px"
    >
      <div className="flex">
        <button
          className="rounded-full w-4 h-4 border-1 border-gray-900 bg-red-400 absolute top-4 left-4"
          onClick={onClose}
        />
        <button
          className="rounded-full w-4 h-4 border-1 border-gray-900 bg-yellow-400 absolute top-4 left-10"
          onClick={onMinimize}
        />
        <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-green-400 absolute top-4 left-16" />
      </div>
      <div className="flex gap-1 mb-4 text-lg rounded-lg pl-0 p-2 w-fit font-semibold mt-6">
        <p>Sobre mim</p>
      </div>
      <div className="items-center justify-center text-justify w-full">
        <p>
          Sou programador e estudante de Sistemas para Internet na Univali.
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
