import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { FiMenu } from 'react-icons/fi';
import axios from 'axios';

import './styles.css';

export default () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/langs').then((res) => setArr(res.data));
  }, []);

  return (
    <div className="container">
      <h1>VOTE y VOTE</h1>
      <form>
        <section>
          <input type="email" name="email" id="email" placeholder="Email" />
        </section>

        <section>
          <h3 className="rank-label">Ranqueie os items:</h3>

          <div className="table-rank">
            <div className="rank-nums">
              {arr.map((elem, index) => (
                <p key={index + 1}>{index + 1}</p>
              ))}
            </div>
            <ReactSortable
              className="rank-langs"
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
        </section>

        <section className="buttons">
          <button type="button">Resultados</button>
          <button type="submit">Vote</button>
        </section>
      </form>
    </div>
  );
};
