import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

import '../styles/pages/orphaMap.css';

import marker from '../assets/map-marker.svg'
import 'leaflet/dist/leaflet.css';
function OrphaMap(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={marker} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </footer>
            </aside>

            <Map
            center={[-13.0134901,-38.5054169]}
            zoom={16}
            style={{ width: '100%', height: '100%'}}
            >
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphaMap;