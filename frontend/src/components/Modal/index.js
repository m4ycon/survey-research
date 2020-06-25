import React from 'react';

import './styles.css';

export default ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <section className="modal-bg">
      <div className="modal-container">
        <main>{children}</main>
        <footer>
          <button onClick={onClose}>OK</button>
        </footer>
      </div>
    </section>
  );
};
