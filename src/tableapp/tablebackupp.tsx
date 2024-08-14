import React, { useState, useEffect } from "react";
import "./table.css";
import { Link } from "react-router-dom";
import veroLogo from "/verologo1pb.png";
import itemsData from '../type/item1.json'; // Certifique-se de que este caminho está correto

interface TableProps {
  filial: string;
}

interface Item {
  codigo: string;
  nome: string;
  armazem: string;
  map: string;
}

const Table: React.FC<TableProps> = ({ filial }) => {
  const [dados, setDados] = useState<Item[]>([]);
  const [codigo, setCodigo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [armazem, setArmazem] = useState<string>('');
  const [map, setMap] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [quantidade, setQuantidade] = useState<number>(1);
  
  // Função para buscar a descrição com base no código do item
  const fetchItemDescription = (codigo: string) => {
    const item = itemsData.find((item: any) => item.Produto === codigo); // Verifique o formato do JSON
    if (item) {
      setName(item.Descricao);
      setArmazem(item.Armazem);
    } else {
      setName('');
      setArmazem('');
    }
  };

  useEffect(() => {
    if (codigo) {
      fetchItemDescription(codigo);
    }
  }, [codigo]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setDados([]);
  };

  const handleChangeCodigo = (event: React.ChangeEvent<HTMLInputElement>) => setCodigo(event.target.value);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleChangeArmazem = (event: React.ChangeEvent<HTMLInputElement>) => setArmazem(event.target.value);
  const handleChangeMap = (event: React.ChangeEvent<HTMLInputElement>) => setMap(event.target.value);
  const handleChangeQuantidade = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 || isNaN(value)) {
      setQuantidade(value);
    }
  };

  const handleAddItem = () => {
    if (codigo && name && armazem) {
      const novoItem: Item = {
        codigo,
        nome: name,
        armazem,
        map
      };

      const itens = Array.from({ length: quantidade }, () => novoItem);
      setDados(prevDados => [...prevDados, ...itens]);

      setCodigo('');
      setName('');
      setArmazem('');
      setMap('');
      setQuantidade(1);
    } else {
      console.log('Não é possível adicionar o item. Verifique se todos os campos estão preenchidos.');
    }
  };

  const splitIndex = Math.ceil(dados.length / 2);
  const dadosColuna1 = dados.slice(0, splitIndex);
  const dadosColuna2 = dados.slice(splitIndex);

  return (
    <>
      <div>
        <h2>Dados para a Filial: {filial}</h2>
        <div className="no-print">
          <div className="info-section">
            <h1>Bem-vindo ao gerador de etiqueta da VERO - Feito por Júnior Graça</h1>
            <div className="area-dados">
              <Link to="/" className="link">Voltar ao início</Link>
              <p><b>Código do item</b></p>
              <input
                type='text'
                placeholder='Digite o código do produto'
                value={codigo}
                onChange={handleChangeCodigo}
              />
              <p><b>Nome do item</b></p>
              <input
                type='text'
                placeholder='Digite o nome do produto'
                value={name}
                onChange={handleChangeName}
              />
              <p><b>Armazém do item</b></p>
              <input
                type='text'
                placeholder='Digite o armazém do produto'
                value={armazem}
                onChange={handleChangeArmazem}
              />
              <div className='areaInput'>
                <p><b>
                  Mapa de almox</b>
                  <span className='infotext'>(se não houver deixe em branco)</span>
                  <input
                    type="checkbox"
                    className='inputChk'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </p>
                <input
                  type='text'
                  placeholder='Digite o mapa onde encontra o produto'
                  value={map}
                  disabled={!isChecked}
                  onChange={handleChangeMap}
                />
              </div>
              <p><b className="textInform">Quantidade de itens</b></p>
              <input
                type='number'
                placeholder='Número de itens'
                value={quantidade}
                onChange={handleChangeQuantidade}
                min="1"
              />
              <button className="btnOnClick" onClick={handleAddItem}>Adicionar</button>
            </div>
          </div>
        </div>

        {Array.from({ length: Math.max(dadosColuna1.length, dadosColuna2.length) }).map((_, rowIndex) => (
          <section key={rowIndex}>
            <div className="sect2">
              <div className="textarea">
                <div className="pretext">
                  <p className="texdescr">
                    <p>{dadosColuna1[rowIndex]?.nome || ''}</p>
                  </p>
                </div>
                <div className="pretext">
                  <p className="textp">
                    <p>CÓD.: {dadosColuna1[rowIndex]?.codigo || ''}</p>
                  </p>
                </div>
                {isChecked ? (
                  <>
                    <div className="pretext">
                      <p className="textp">
                        <p>ARMAZÉM: {dadosColuna1[rowIndex]?.armazem || ''}</p>
                      </p>
                    </div>
                    <p className="textp">
                      <p className="map"> {dadosColuna1[rowIndex]?.map || ''} </p>
                    </p>
                  </>
                ) : (
                  <div>
                    <p className="textp">
                      <p className="map"> ARMAZÉM: {dadosColuna1[rowIndex]?.armazem || ''} </p>
                    </p>
                  </div>
                )}
              </div>
              <div className="logoarea">
                <img className="logoVero" src={veroLogo} width="120px" alt="Logo" />
              </div>
            </div>
           
            <div className="sect1">
              <div className="textarea">
                <div className="pretext">
                  <p className="texdescr">
                    <p>{dadosColuna2[rowIndex]?.nome || ''}</p>
                  </p>
                </div>
                <div className="pretext">
                  <p className="textp">
                    <p>CÓD.: {dadosColuna2[rowIndex]?.codigo || ''}</p>
                  </p>
                </div>
                {isChecked ? (
                  <>
                    <div className="pretext">
                      <p className="textp">
                        <p>ARMAZÉM: {dadosColuna2[rowIndex]?.armazem || ''}</p>
                      </p>
                    </div>
                    <p className="textp">
                      <p className="map">{dadosColuna2[rowIndex]?.map || ''}</p>
                    </p>
                  </>
                ) : (
                  <div>
                    <p className="textp">
                      <p className="map"> ARMAZÉM: {dadosColuna2[rowIndex]?.armazem || ''} </p>
                    </p>
                  </div>
                )}
              </div>
              <div className="logoarea">
                <img className="logoVero" src={veroLogo} width="120px" alt="Logo" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Table;
