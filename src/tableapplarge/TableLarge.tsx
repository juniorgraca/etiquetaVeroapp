import { useState } from "react";
import "./TableLarge.css";
import { Link } from "react-router-dom";
import veroLogo from "/verologo1.png";
interface Item {
  codigolarge: string;
  nomelarge: string;
  armazemlarge: string;
  maplarge: string;
}

function TableLarge() {
  // Estado para gerenciar a lista de itens e os campos de entrada
  const [dadoslarge, setDadoslarge] = useState<Item[]>([]);
  const [codigolarge, setCodigolarge] = useState<string>('');
  const [namelarge, setNamelarge] = useState<string>('');
  const [armazemlarge, setArmazemlarge] = useState<string>('');
  const [maplarge, setMaplarge] = useState<string>('');
  const [isCheckedlarge, setIsCheckedlarge] = useState<boolean>(false);
  const [quantidadelarge, setQuantidadelarge] = useState<string>('1'); // Usar string para o valor

  // Função para lidar com a mudança do checkbox
  const handleCheckboxChangelarge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedlarge(event.target.checked);
    setDadoslarge([])
  };

  // Funções para lidar com a mudança dos campos de entrada
  const handleChangeCodigolarge = (event: React.ChangeEvent<HTMLInputElement>) => setCodigolarge(event.target.value);
  const handleChangeNamelarge = (event: React.ChangeEvent<HTMLInputElement>) => setNamelarge(event.target.value);
  const handleChangeArmazemlarge = (event: React.ChangeEvent<HTMLInputElement>) => setArmazemlarge(event.target.value);
  const handleChangeMaplarge = (event: React.ChangeEvent<HTMLInputElement>) => setMaplarge(event.target.value);
  const handleChangeQuantidadelarge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Garante que a quantidade seja um número válido e maior ou igual a 1
    if (value === '' || parseInt(value, 10) >= 1) {
      setQuantidadelarge(value);
    }
  };

  // Função para adicionar novos itens à lista
  const handleAddItemlarge = () => {
    if (codigolarge && namelarge && armazemlarge) {
      const novoItemlarge: Item = {
        codigolarge,
        nomelarge: namelarge,
        armazemlarge,
        maplarge
      };

      const itenslarge = Array.from({ length: parseInt(quantidadelarge, 10) }, () => novoItemlarge);
      setDadoslarge([...dadoslarge, ...itenslarge]);

      setCodigolarge('');
      setNamelarge('');
      setArmazemlarge('');
      setMaplarge('');
      setQuantidadelarge('1');
    } else {
      console.log('Não é possível adicionar o item. Verifique se todos os campos estão preenchidos.');
    } // Reseta a quantidade para o valor inicial
  
  };

  return (
    <>
     <div className="no-print">
      <div className="info-section">
        <h1>Bem-vindo ao gerador de etiqueta da VERO - Feito por Júnior Graça</h1>
        <div className="area-dados">
          <Link to="/"  className="link">Voltar ao inicio</Link>
          <p className="plarge2">Código do item</p>
          <input
            type='text'
            placeholder='Digite o código do produto'
            value={codigolarge}
            onChange={handleChangeCodigolarge}
          />
          <p>Nome do item</p>
          <input
            type='text'
            placeholder='Digite o nome do produto'
            value={namelarge}
            onChange={handleChangeNamelarge}
          />
          <p>Armazém do item</p>
          <input
            type='text'
            placeholder='Digite o armazém do produto'
            value={armazemlarge}
            onChange={handleChangeArmazemlarge}
          />
          <div className='areaInput'>
            <p>
              Mapa de almox
              <span className='infotext'>(se não houver deixe em branco)</span>
              <input
                type="checkbox"
                className='inputChk'
                checked={isCheckedlarge}
                onChange={handleCheckboxChangelarge}
              />
            </p>
            <input
              type='text'
              placeholder='Digite o mapa onde encontra o produto'
              value={maplarge}
              onChange={handleChangeMaplarge}
              disabled={!isCheckedlarge} // Desabilita o campo se o checkbox não estiver marcado
            />
          </div>
          <p>Quantidade de itens</p>
          <input
            type='number'
            placeholder='Número de itens'
            value={quantidadelarge}
            onChange={handleChangeQuantidadelarge}
            min="1"
          />
          <button onClick={handleAddItemlarge}>Adicionar</button>
        </div>
      </div>
      </div>
      
      <div className="bodylarge">
      
        <section className="secLarge">
          {dadoslarge.map((item, index) => (
            <div className="bodySecLarge" key={index}>
              <div className="textLarge">
              <div className="itemText"> <p className="plarge"> <p className="itemCod"> CÓD.:{item.codigolarge}</p></p></div>
              <div className="itemText"> <p className="plarge"> <p className="itemName">{item.nomelarge}</p></p></div>
              {isCheckedlarge ? (
                <> <div className="itemText"> <p className="plarge"> <p className="itemArma">{item.armazemlarge}</p></p></div>
                  <p className="plarge"><p className="itemMap">{item.maplarge}</p></p></>
              ):(
                <>
                 <p className="plarge"><p className="itemArma">ARMAZÉM: {item.armazemlarge} </p></p>
                </>
              )}
             

              </div>
              <div className="logoAreaimg">
              <img className="logoVero" src={veroLogo} width="220px" alt="" />
              </div>

            </div>
             
            ))}
            </section>
        
      </div>
     
    </>
  );
}

export default TableLarge;
