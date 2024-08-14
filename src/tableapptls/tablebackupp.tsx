import React, { useState, useEffect } from "react";
import "./table.css";
import { Link } from "react-router-dom";
import veroLogo from "/verologo1pb.png";
import itemsData3 from '../type/item3.json';

interface Item {
  codigo: string;
  nome: string;
  armazem: string;
  map: string;
}

const Tabletls: React.FC = () => {
  const [dados, setDados] = useState<Item[]>([]);
  const [codigo, setCodigo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [map, setMap] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [armazensDisponiveis, setArmazensDisponiveis] = useState<string[]>([]);
  const [armazensSelecionados, setArmazensSelecionados] = useState<Set<string>>(new Set());
  const [armazemManual, setArmazemManual] = useState<string>('');

  const fetchItemDescription = (codigo: string) => {
    const armazens = new Set<string>();
    itemsData3.forEach((item) => {
      if (item.Produto === codigo) {
        armazens.add(item.Armazem);
      }
    });

    setArmazensDisponiveis(Array.from(armazens));
    setArmazensSelecionados(new Set());
    setArmazemManual('');
    setName(itemsData3.find((item) => item.Produto === codigo)?.Descricao || '');
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
  const handleChangeArmazem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedArmazens = new Set(armazensSelecionados);

    if (updatedArmazens.has(value)) {
      updatedArmazens.delete(value);
    } else {
      updatedArmazens.add(value);
    }

    setArmazensSelecionados(updatedArmazens);
  };

  const handleChangeArmazemManual = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArmazemManual(event.target.value);
  };

  const handleChangeMap = (event: React.ChangeEvent<HTMLInputElement>) => setMap(event.target.value);
  const handleChangeQuantidade = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 || isNaN(value)) {
      setQuantidade(value);
    }
  };

  const handleAddItem = () => {
    if (codigo && name && (armazensSelecionados.size > 0 || armazemManual)) {
      const armazensFinal = new Set(armazensSelecionados);
      if (armazemManual) {
        armazensFinal.add(armazemManual);
      }

      const itens = Array.from(armazensFinal).flatMap((armazem) =>
        Array.from({ length: quantidade }, () => ({
          codigo,
          nome: name,
          armazem,
          map
        }))
      );

      setDados(prevDados => [...prevDados, ...itens]);

      // Reseta os campos após adicionar o item
      setCodigo('');
      setName('');
      setArmazemManual('');
      setArmazensSelecionados(new Set()); // Limpa a seleção dos armazéns
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
              {armazensDisponiveis.length > 0 && (
                <div>
                  {armazensDisponiveis.map((armazem) => (
                    <label key={armazem}>
                      <input
                        type="checkbox"
                        value={armazem}
                        checked={armazensSelecionados.has(armazem)}
                        onChange={handleChangeArmazem}
                      />
                      {armazem}
                    </label>
                  ))}
                </div>
              )}
              <p><b>Armazém Manual</b></p>
              <input
                type='text'
                placeholder='Digite um armazém manualmente'
                value={armazemManual}
                onChange={handleChangeArmazemManual}
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
                    {dadosColuna1[rowIndex]?.nome || ''}
                  </p>
                </div>
                <div className="pretext">
                  <p className="textp">
                    CÓD.: {dadosColuna1[rowIndex]?.codigo || ''}
                  </p>
                </div>
                {isChecked ? (
                  <>
                    <div className="pretext">
                      <p className="textp">
                        ARMAZÉM: {dadosColuna1[rowIndex]?.armazem || ''}
                      </p>
                    </div>
                    <p className="textp">
                      {dadosColuna1[rowIndex]?.map || ''}
                    </p>
                  </>
                ) : (
                  <div>
                    <p className="textp">
                      ARMAZÉM: {dadosColuna1[rowIndex]?.armazem || ''}
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
                    {dadosColuna2[rowIndex]?.nome || ''}
                  </p>
                </div>
                <div className="pretext">
                  <p className="textp">
                    CÓD.: {dadosColuna2[rowIndex]?.codigo || ''}
                  </p>
                </div>
                {isChecked ? (
                  <>
                    <div className="pretext">
                      <p className="textp">
                        ARMAZÉM: {dadosColuna2[rowIndex]?.armazem || ''}
                      </p>
                    </div>
                    <p className="textp">
                      {dadosColuna2[rowIndex]?.map || ''}
                    </p>
                  </>
                ) : (
                  <div>
                    <p className="textp">
                      ARMAZÉM: {dadosColuna2[rowIndex]?.armazem || ''}
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

export default Tabletls;
