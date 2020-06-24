import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { FiMenu } from 'react-icons/fi';

import './styles.css';

export default () => {
  const [arr, setArr] = useState([
    { id: 1, lang: 'Javascript' },
    { id: 2, lang: 'Ruby' },
    { id: 3, lang: 'Python' },
    { id: 4, lang: 'C++' },
    { id: 5, lang: 'PHP' },
    { id: 6, lang: 'Java' },
  ]);

  return (
    <div className="container">
      <h1>VOTE y VOTE</h1>
      <form>
        <div>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="table-rank">
          <label htmlFor="table">Ranqueie as linguagens</label>
          <ReactSortable
            list={arr}
            setList={setArr}
            handle=".handler"
            animation={150}
          >
            {arr.map(({ id, lang }) => (
              <div className="lang-container" key={id}>
                <p>{lang}</p>
                <FiMenu className="handler" cursor="move" />
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="buttons">
          <button type="button">Resultados</button>
          <button type="submit">Vote</button>
        </div>
      </form>
    </div>
  );
};
