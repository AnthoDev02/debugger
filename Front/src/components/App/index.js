import React, { useState } from 'react';
import axios from 'axios';

import './styles.css';

const Debugger = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      url: { search },
    };
    axios.post('http://localhost:9852', config)
      .then((response) => {
        const apiResponse = response.data;
        setResult(apiResponse);
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
            <tr className="rowResult">
              <td className="centered">la date</td>
              <td className="noCentered">{search}</td>
              <td className="centered">{result.statusCode}</td>
              <td className="noCentered">{result.fstrzFlags}</td>
              <td className="centered">{result.cloudfrontStatus}</td>
              <td className="noCentered">{result.cloudfrontPOP}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Debugger;
