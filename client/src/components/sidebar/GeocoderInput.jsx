//Componente responsavel por inserir a caixa de Pesquisa dos Locais no componente SideBar.jsx
//As especificações do envio dos nomes das localidades podem ser consultadas na documentação do MapBox

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';

const ctrl = new MapboxGeocoder({
  marker: false, 
  accessToken: process.env.REACT_APP_MAP_TOKEN,//Variavel de acesso do cadastro na API Mapbox > arquivo .env
});

const GeocoderInput = () => {
  const { mapRef, containerRef, dispatch } = useValue();

  useEffect(() => {
    if (containerRef?.current?.children[0]) {
      containerRef.current.removeChild(containerRef.current.children[0]);
    }
    containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()));// Buscar a partir do que foi adiconado no input

    ctrl.on('result', (e) => { 
      const coords = e.result.geometry.coordinates;
      dispatch({
        type: 'FILTER_ADDRESS',
        payload: { lng: coords[0], lat: coords[1] },
      });
    }); //Metodo escutador que verifica as coordenadas usando o reducer FILTER_ADDRESS toda vez que o input text e atualizado

    ctrl.on('clear', () => dispatch({ type: 'CLEAR_ADDRESS' }));
  }, []);// Zera o valor do input e reseta o mapa para os valores padrões.
  return null;
};

export default GeocoderInput;