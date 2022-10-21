import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// setting prox url
axios.defaults.baseURL = "http://localhost:3001";
// setting with credentials true for all axios requests
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
