"use client";

import ProjectsTab from "@/components/Tabs/ProjectsTab";
import { motion } from "framer-motion";

export default function Projetos() {
  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full overflow-hidden items-end h-[90%] mt-auto"
    >
      <ProjectsTab />
    </motion.main>
  );
}
