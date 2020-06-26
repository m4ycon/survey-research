import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default () => {
  const [langs, setLangs] = useState([]);
  const [mostVoted, setMostVoted] = useState(0); // counting weights too

  useEffect(() => {
    api.get('langs').then((res) => {
      setLangs(
        res.data.sort((a, b) =>
          a.votes === b.votes ? 0 : a.votes < b.votes ? 1 : -1
        )
      );
      setMostVoted(res.data[0].votes);
    });
  }, []);

  return (
    <div className="container">
      <h1>Just Vote</h1>
      <section>
        <h2>Resultados</h2>
        <div className="rank-table">
          {langs.map(({ id, lang, votes }, index) => (
            <div key={id} className="lang">
              <p>{index + 1}</p>
              <div
                style={{ width: (votes / mostVoted) * 100 + '%' }}
                className="percentage-votes"
              >
                <p>{lang}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
