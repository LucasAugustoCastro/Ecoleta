import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiSearch } from 'react-icons/fi'
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.svg';
import Search from '../../components/Search';

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}


const Home: React.FC = () => {
  const [actived, setActived] = useState<boolean>(false);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');

  useEffect(()=>{
    if (selectedUf === '0'){
      return;
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(uf => uf.nome);

        setCities(cityNames);
      })


  },[selectedUf])

  const handleSelectUf = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUf(event.target.value);
  },[]);
  const handleSelectCity = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  },[]);

  const handleClicked = useCallback( () => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      })


    setActived(true);
  }, []);

  const handleSubmit = useCallback(() => {

  }, []);

  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
          <Link to="/create-point">
            <span></span>
              <FiLogIn  size={24}/>
            
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
          <button onClick={handleClicked}>
            <span>
              <FiSearch />
            </span>
            <strong>Pesquisar pontos de coleta</strong>
          </button>
          
        </main>
        
        <Search actived={actived}>
          <strong>Pontos de Coleta</strong>
          <div>
            <select 
              name="uf" 
              id="uf" 
              value={selectedUf} 
              onChange={handleSelectUf}
            >
              <option value="0">Selecione uma UF</option>
              {
                ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))
              }
            </select>

            <select 
              name="city" 
              id="city" 
              value={selectedCity} 
              onChange={handleSelectCity}
            >
              <option value="0">Selecione uma Cidade</option>
              {
                cities.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))
              }
            </select>

            <Link to={{
              pathname: '/list',
              state: [{selectedUf, selectedCity}]
            }}>Buscar</Link>
          </div>
        </Search>

      </div>

    </div>
  )
}

export default Home;