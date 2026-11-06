import HeaderClient from "@/components/HeaderClient";
import { buildNav } from "@/data/nav";

/** En-tête : calcule la navigation côté serveur (marques par catégorie, badges) puis la passe au composant client. */
export default function Header() {
  return <HeaderClient nav={buildNav()} />;
}
