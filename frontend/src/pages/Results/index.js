import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default () => {
  const [langs, setLangs] = useState([]);
  const [mostVoted, setMostVoted] = useState(0);
  const [totVotes, setTotVotes] = useState(0);

  useEffect(() => {
    api.get('langs').then((res) => {
      setLangs(
        res.data.sort((a, b) =>
          a.votes === b.votes ? 0 : a.votes < b.votes ? 1 : -1
        )
      );
      setMostVoted(res.data[0].votes);
      setTotVotes(res.data.reduce((acc, { votes }) => (acc += votes), 0));
    });
  }, []);

  return (
    <div className="container">
      <h1>Just Vote</h1>
      <section>
        <h2>Resultados</h2>
        <div className="rank-table">
          {langs.map(({ id, lang, votes }, index) => (
            <div key={id} className="container-lang">
              <h4>{index + 1}</h4>
              <div className="lang">
                <h3 className="lang-name">{lang}</h3>
                <div className="percentage-container">
                  <div style={{ width: (votes / mostVoted) * 100 + '%' }}>
                    <p className="lang-percentage">
                      {((votes / totVotes) * 100).toFixed(2) + '%'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
