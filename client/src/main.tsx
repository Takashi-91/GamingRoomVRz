import { createRoot } from "react-dom/client";
import App from "./App";
import Gate from "../src/lib/GateComponent";
import "./index.css";

createRoot(document.getElementById("root")!).render(<Gate><App /></Gate>);
