import { getImage } from "astro:assets";
import aws from "../../assets/certificates/aws.png";
import security from "../../assets/certificates/web-security.png";
import algorithms from "../../assets/certificates/algorithms.png";

const sources = { aws, "web-security": security, algorithms };
export async function credentialPreview(id: string) {
  const src = sources[id as keyof typeof sources];
  return src ? (await getImage({ src, width: 620, format: "webp", quality: 85 })).src : undefined;
}
