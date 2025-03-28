import { Rnd } from "react-rnd";
import useTranslation from "next-translate/useTranslation";

export default function AboutMeTab({ state, onClose, onMinimize }) {
  const { t } = useTranslation("AboutMeTab");

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
        <p>{t("title")}</p>
      </div>
      <div className="items-center justify-center text-justify w-full">
        <p>
          {t("description1")}
          <br />
          {t("description2")}
          <br />
          {t("description3")}
        </p>{" "}
      </div>
    </Rnd>
  );
}
