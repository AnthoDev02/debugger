import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import Loader from '../Loader';

import './styles.css';

const Debugger = () => {
  // création de l'ensemble des states
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [errorUrl, setErrorUrl] = useState(false);
  const [errorApi, setErrorApi] = useState({ errorMessage: '', isError: false });

  // regex permettant de controler l'Url entrée dans l'input
  const url = new RegExp(/https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z]{2,3}\b([a-zA-Z]*)$/);

  // création de la date du jour
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  // gestion des cas d'erreur lors de la soumission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!url.test(search) || search === '') {
      setErrorUrl(true);
    }
    if (url.test(search)) {
      setIsLoading(true);
      const config = {
        url: { search },
      };
      axios.post('http://localhost:9852', config)
        .then((response) => {
          // envoi du message lors d'une erreur côté API
          if (response.data.isError) {
            setErrorApi({ errorMessage: response.data.errorMessage, isError: true });
            setIsLoading(false);
          }
          else {
            // si tout se passe bien, stockage de la réponse dans localStorage et dans le tableau
            setResult(response.data);
            const key = `${`apiResponse${number}`}`;
            localStorage.setItem(key, JSON.stringify(response.data));
            setIsLoading(false);
          }
        });
    }
    setNumber(number + 1);
  };

  return (
    <div className="main">
      <div className="title" />
      <div className="search">
        <header>DEBUGGER</header>
        <div className="searchHeader">
          <div className="square" />
          <h2>HEADER DEBUGGER</h2>
        </div>
        <form
          onSubmit={
            handleSubmit
          }
        >
          <label>Url to check</label>
          <input
            className="input"
            onClick={() => {
              setResult('');
              setSearch('');
              setErrorUrl(false);
              setErrorApi({ errorMessage: '', isError: false });
            }}
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
        {/* Les différents messages d'erreur */}
        {errorUrl && <div className="errorlabel">L'url n'est pas valide</div>}
        {errorApi.isError && <div className="errorlabel">{errorApi.errorMessage}</div>}
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
                      <td className="centered">{result.statusCode === 200 ? <Icon color="green" name="cloud" /> : <Icon color="red" name="cloud" />}</td>
                      <td className="noCentered">{result.fstrzFlags ? <span className="flag">{result.fstrzFlags}</span> : 'N.R.'}</td>
                      <td className="centered">{result.cloudfrontStatus ? <span className="CFStatus">{result.cloudfrontStatus}</span> : 'N.R.' }</td>
                      <td className="noCentered">{result.cloudfrontPOP ? result.cloudfrontPOP : 'N.R.'}</td>
                    </tr>
                  )
                  : <tr />}
              </tbody>
            </table>
          ) : ''}
        {isLoading ? <Loader /> : ''}
        {result !== '' && <div className="arrayInfo">"N.R. = Non Renseigné"</div>}
      </div>
    </div>
  );
};

export default Debugger;
