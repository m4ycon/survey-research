import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';

export default () => {
  return (
    <div className="container">
      <h1>Just Vote</h1>
      <section>
        <main>
          <p>✔ Votos confirmados com sucesso!</p>
        </main>
        <footer>
          <Link className="button-link" to="/results">
            Resultados
          </Link>
        </footer>
      </section>
    </div>
  );
};
