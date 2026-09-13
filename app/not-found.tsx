import "./(frontend)/globals.css";
import { Document } from "@/src/components/site/document";
import { NotFoundBody } from "@/src/components/site/not-found-body";

/** Global 404 for paths outside every route group; carries its own document because the root has no layout. */
export default function GlobalNotFound() {
  return (
    <Document>
      <NotFoundBody />
    </Document>
  );
}
