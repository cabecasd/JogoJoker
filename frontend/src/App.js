import './App.css';
import PaginaInicial from "./app/components/PaginaInicial"
import PaginaPerguntas from "./app/components/PaginaPerguntas"
// import store from "./app/store"
import { useSelector } from "react-redux";

function App() {
  const appState = useSelector(state => state.appState)


  return (
    <div className="App">
      {appState === 0 ? <PaginaInicial /> : <PaginaPerguntas />}
    </div>
  );
}

export default App;
