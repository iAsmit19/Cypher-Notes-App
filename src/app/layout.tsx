import "@/global.css";
import Header from "./components/Header";
import { AddNoteProvider } from "@/context/AppContext";

export const metadata = {
  title: "Cypher Notes | Space for your thoughts",
  description: "Built by Asmit Singh. Technologies used: Next.js, React JS, TypeScript, Framer Motion, Context API, MongoDB, API, JavaScript, CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AddNoteProvider>
          <Header />
          <main className="cy_main">{children}</main>
        </AddNoteProvider>
      </body>
    </html>
  );
}
