import { getExperienceDuration } from "@/lib/utils";
import { Rnd } from "react-rnd";

export default function AboutMeTab({ state, onClose, onMinimize }) {
  if (state === "minimized") return null;


const experienceText = getExperienceDuration(new Date("2025-02-03"));

  return (
    <Rnd
      className="flex-col min-w-20 max-w-[40rem] p-8 relative shadow-xl bg-black/5 backdrop-blur-[40px] border border-white/40 rounded-xl z-50"
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
      <div className="flex gap-1 mb-4 text-2xl  pl-0 p-2 w-fit mt-6 text-white/80  drop-shadow-2xl ">
        <p>Sobre mim</p>
      </div>
      <div className="items-center justify-center text-base text-justify w-full text-white/80 drop-shadow-3xl">
    <p>
      Sou desenvolvedor fullstack há <strong>{experienceText}</strong> e estudante de Sistemas para Internet na Univali.
    </p>
    <br/>
      <p>
      Tenho bastante experiência com front-end, mas também trabalho com back-end e arquitetura de aplicações.
      </p>
          <br/>

    <p>
      Nos últimos tempos, venho focando cada vez mais em Cloud. Entender como aplicações escalam, se comunicam e se mantêm resilientes na infraestrutura é o que mais me atrai hoje.
        </p>
  <br />

      </div>
    </Rnd>
  );
}
