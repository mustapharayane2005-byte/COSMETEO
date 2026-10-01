import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const alt = "COSMÉTÉO, boutique beauté et soins au Bénin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Polices lues dans node_modules : aucun appel réseau pendant le build.
const font = (pkg: string, file: string) => readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

/** Image de partage par défaut : logo + halo, baseline, photo du hero. */
export default async function OgImage() {
  const [nunito, inter, photo] = await Promise.all([
    font("nunito", "nunito-latin-800-normal.woff"),
    font("inter-tight", "inter-tight-latin-500-normal.woff"),
    // photo réduite et recompressée pour garder le PNG final sous 300 Ko
    sharp(path.join(process.cwd(), "public/images/hero-desktop.jpg"))
      .resize(500, 566, { fit: "cover", position: "right" })
      .jpeg({ quality: 68 })
      .toBuffer(),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const ink = "#5A534E";
  const LOGO = 124;

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 32, background: "#EDECE8" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            borderRadius: 48,
            background: "#F7F6F3",
            padding: 40,
            gap: 32,
          }}
        >
          <div style={{ width: "55%", display: "flex", flexDirection: "column", justifyContent: "center", color: ink }}>
            <div
              style={{
                display: "flex",
                position: "relative",
                alignSelf: "flex-start",
                fontFamily: "Nunito",
                fontWeight: 800,
                fontSize: LOGO,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {/* halo en premier : il est peint sous les lettres */}
              <span
                style={{
                  position: "absolute",
                  right: -LOGO * 0.25,
                  top: LOGO / 2 - LOGO * 1.05,
                  width: LOGO * 2.1,
                  height: LOGO * 2.1,
                  borderRadius: 9999,
                  backgroundImage: "radial-gradient(circle at 38% 32%, #FAF6EF 0%, #E6D6C4 55%, #D2B196 100%)",
                }}
              />
              <span style={{ position: "relative" }}>cosméteo</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 56, fontFamily: "Inter Tight", fontSize: 30, fontWeight: 500, lineHeight: 1.25 }}>
              <span>Beauté, soins & bien-être</span>
              <span>Livraison au Bénin et à l&apos;international</span>
            </div>
          </div>
          <div style={{ width: "45%", display: "flex", borderRadius: 40, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoSrc} width={500} height={566} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nunito", data: nunito, weight: 800, style: "normal" },
        { name: "Inter Tight", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
  // palette indexée : PNG sensiblement plus léger (WhatsApp ignore les images trop lourdes)
  const png = await sharp(Buffer.from(await image.arrayBuffer()))
    .png({ palette: true, quality: 72, colours: 160, effort: 10, compressionLevel: 9 })
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
