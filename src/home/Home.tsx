
import React from 'react';
import "./Home.css";
import veroLogo from "/verologo1.png";
import { useFilial } from '../FilialContext'; // Importando o contexto

export default function Home() {
  const { filial, setFilial } = useFilial();

  const handleFilialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilial(event.target.value);
  };

  return (
    <>
      <div className="homeMain">
        <div className="logoandselect">
          <div className="logoandselectArea">
            <img src={veroLogo} width="100px" height="30px" alt="Logo" />
            <div className="fundoSelec">
              <div className="initalMsgSelec">Selecione a Filial</div>
              <select name="filial" id="filial" value={filial} onChange={handleFilialChange}>
                <option value="1">Andradina</option>
                <option value="2">Campo Grande</option>
                <option value="3">Três Lagoas</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='containetTxt'>
        <p className='Welcometxt'>Bem-vindo(a)!
        </p>
        <p className='initalMsgSelec'>Escolha sua filial para gerar suas etiquetas</p>
        <button className='btnindex'>Etiqueta média 2cm</button>
        <button className='btnindex'>Etiqueta média Grande 4cm </button>
        <p className='powertext'>Powered by Júnior Graça</p>
      </div>
    </>
  );
}
