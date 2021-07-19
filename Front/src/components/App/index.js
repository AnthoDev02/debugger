import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import Loader from '../Loader';
import code from '../../Data/code.json';

import './styles.css';

const Debugger = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [airport, setAirport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month + 1}/${year}`;

  useEffect(() => {
    axios.get('http://localhost:9852/airport')
      .then((response) => {
        const airportArray = response.data;
        setAirport(airportArray);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    setResult('');
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
                      <td className="centered">{currentDate}</td>
                      <td className="noCentered">{search}</td>
                      <td className="centered">{result.statusCode === 200 ? <Icon color="green" name="cloud" /> : <Icon textAlign="center" color="red" name="cloud" />}</td>
                      <td className="noCentered">{code[result.fstrzFlags]}</td>
                      <td className="centered"><span className="CFStatus">{result.cloudfrontStatus}</span></td>
                      <td className="noCentered">{airport[result.cloudfrontPOP].country}</td>
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
