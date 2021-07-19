import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import Loader from '../Loader';

import './styles.css';

const Debugger = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [airport, setAirport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    axios.get('https://www.cloudping.cloud/cloudfront-edge-locations.json', config)
      .then((response) => {
        console.log('response de location', response);
        const airportArray = response.nodes;
        setAirport(airportArray);
        console.log('airportArray', airportArray);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const config = {
      url: { search },
    };
    axios.post('http://localhost:9852', config)
      .then((response) => {
        const apiResponse = response.data;
        setResult(apiResponse);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="main">
      <div className="title">
        <h1>Fasterize</h1>
      </div>
      <div className="search">
        <header>FASTERIZE DEBUGGER</header>
        <div className="searchHeader">
          <div className="square" />
          <h2>HEADER DEBUGGER</h2>
        </div>
        <form
          onSubmit={handleSubmit}
        >
          <label>Url to check</label>
          <input
            className="input"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            value={search}
          />
          <button
            type="submit"
          >
            LAUNCH ANALYSIS
          </button>

        </form>
        <div className="searchHeader">
          <div className="square" />
          <h2>HISTORY</h2>
        </div>
        {result !== ''
          ? (
            <table>
              <thead>
                <tr>
                  <th className="centered">Date</th>
                  <th className="noCentered">URL</th>
                  <th className="centered">Status</th>
                  <th className="noCentered">Flags</th>
                  <th className="centered">Cloudfront status</th>
                  <th className="noCentered">Cloudfront pop</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading
                  ? (
                    <tr className="rowResult">
                      <td className="centered">la date</td>
                      <td className="noCentered">{search}</td>
                      <td className="centered">{result.statusCode === 200 ? <Icon color="green" name="cloud" /> : <Icon textAlign="center" color="red" name="cloud" />}</td>
                      <td className="noCentered">{result.fstrzFlags}</td>
                      <td className="centered"><span className="CFStatus">{result.cloudfrontStatus}</span></td>
                      <td className="noCentered">{result.cloudfrontPOP}</td>
                    </tr>
                  )
                  : <tr />}
              </tbody>
            </table>
          ) : ''}
        {isLoading ? <Loader /> : ''}
      </div>
    </div>
  );
};

export default Debugger;
