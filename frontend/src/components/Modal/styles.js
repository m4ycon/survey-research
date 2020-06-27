export default {
  modalBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    position: 'relative',

    width: '95%',
    maxWidth: 400,

    border: '1px solid #bbb',
    borderRadius: 8,

    backgroundColor: '#f0f0f5',
  },

  modalMain: {
    fontSize: '1.1em',
    textAlign: 'center',

    minHeight: 80,
    padding: 8,
    borderBottom: '1px solid #bbb',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',

    padding: 8,
  },
};
