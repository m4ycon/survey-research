import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { FiMenu } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import Modal from '../../components/Modal';

export default () => {
  const [email, setEmail] = useState('');
  const [langs, setLangs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    api.get('langs').then((res) => {
      const arr = res.data.map(({ id, lang }) => {
        return { id, lang };
      });
      setLangs(arr);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setModalMessage('Preencha o campo de email.');
      setShowModal(true);
      return;
    }

    await api
      .get(`email/${email}`)
      .then(async (res) => {
        const data = {
          email,
          votes: langs.map((elem, index) => {
            return { lang: elem.id, weight: langs.length - index };
          }),
        };
        await api.post('user-vote', data);
        console.log('Cadastrado com sucesso!');
      })
      .then(() => {
        setModalMessage(
          'Confirme seus votos no link enviado para o seu email.'
        );
        setShowModal(true);
      })
      .catch((err) => {
        setModalMessage('Email já cadastrado.');
        setShowModal(true);
      });
  };

  return (
    <div className="container">
      <h1>Just Vote</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <section>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </section>

        <section>
          <h3 className="rank-label">Ranqueie os items:</h3>

          <div className="table-rank">
            <div className="rank-nums">
              {langs.map((elem, index) => (
                <p key={index + 1}>{index + 1}</p>
              ))}
            </div>
            <ReactSortable
              className="rank-langs"
              list={langs}
              setList={setLangs}
              handle=".handler"
              animation={150}
            >
              {langs.map(({ id, lang }) => (
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
};
