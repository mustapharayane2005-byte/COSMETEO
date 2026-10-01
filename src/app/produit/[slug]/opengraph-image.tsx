import { ImageResponse } from "next/og";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";

export const alt = "Produit COSMÉTÉO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage générée à partir des données produit (marque, nom, prix). */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#EDECE8",
          color: "#5A534E",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, fontWeight: 600, color: "#173B25" }}>COSMÉTÉO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>{p?.brand ?? "Beauté & bien-être"}</div>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, marginTop: 16, letterSpacing: -2 }}>
            {p?.name ?? "Soins, beauté et bien-être"}
          </div>
          {p && <div style={{ display: "flex", fontSize: 40, marginTop: 28 }}>{formatPrice(p.price)}</div>}
        </div>
      </div>
    ),
    size,
  );
}
