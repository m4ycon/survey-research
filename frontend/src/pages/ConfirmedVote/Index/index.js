import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';

export default () => {
  return (
    <div className="container">
      <h1>Just Vote</h1>
      <section>
        <main>
          <p>Confirme seus votos no link enviado para o seu email.</p>
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
