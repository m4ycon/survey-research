import React from 'react';

import './styles.css';

export default function Home() {
  return (
    <div className="container">
      <h1>VOTE y VOTE</h1>
      <form>
        <div>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="table-rank">
          <label htmlFor="table">Ranqueie as linguagens</label>
          <table>
            <tbody>
              <tr>
                <td>1</td>
                <td>Javascript</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ruby</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Python</td>
              </tr>
              <tr>
                <td>4</td>
                <td>C++</td>
              </tr>
              <tr>
                <td>4</td>
                <td>C++</td>
              </tr>
              <tr>
                <td>4</td>
                <td>C++</td>
              </tr>
              <tr>
                <td>4</td>
                <td>C++</td>
              </tr>
              <tr>
                <td>4</td>
                <td>C++</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <button type="button">Resultados</button>
          <button type="submit">Vote</button>
        </div>
      </form>
    </div>
  );
}
