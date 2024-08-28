
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from "./tableapp/Table";
import TableLarge from "./tableapplarge/TableLarge";
import Home from "./home/Home";
import Tabletls from "./tableapptls/Tabletls";
import Tablecg from "./tableappcg/Tablecg";
import { FilialProvider, useFilial } from './FilialContext'; // Importando o contexto

export default function App() {
  return (
    <FilialProvider> {/* Envolvendo com o provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/small" element={<Table />} />
          <Route path="/large" element={<TableLarge />} />
        </Routes>

        {/* Mova a lógica para exibir o título baseado na filial */}
        {/* <FilialStatus /> */}
      </Router>
    </FilialProvider>
  );
}

// const FilialStatus: React.FC = () => {
//   const { filial } = useFilial();

//   return (
//     <>
//       {filial === '1' && <Table />}
//       {filial === '3' && <Tabletls />}
//       {filial === '2' && <Tablecg />}
//     </>
//   );
// };
