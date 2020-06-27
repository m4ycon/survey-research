import React from 'react';

import styles from './styles.js';

export default ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <section style={styles.modalBg}>
      <div style={styles.modalContainer}>
        <main style={styles.modalMain}>{children}</main>
        <footer style={styles.modalFooter}>
          <button onClick={onClose}>OK</button>
        </footer>
      </div>
    </section>
  );
};
