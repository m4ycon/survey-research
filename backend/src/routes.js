const { Router } = require('express');

import VoteController from './database/VoteController';
const voteController = new VoteController();

const routes = Router();

routes.get('/user-vote', async (req, res) => {
  try {
    const user_votes = await voteController.index('user_votes');
    res.status(200).json(user_votes);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong!' });
    console.log(err);
  }
});

routes.post('/user-vote', async (req, res) => {
  const { email, votes } = req.body;
  try {
    await voteController.createUser(email, votes);
    res
      .status(200)
      .json({ message: 'Please confirm your votes, on your email.' });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong!' });
    console.log(err);
  }
});

routes.get('/langs', async (req, res) => {
  try {
    const lang = await voteController.index('lang');
    res.status(200).json(lang);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong!' });
    console.log(err);
  }
});

routes.get('/validate/:token', async (req, res) => {
  const { token } = req.params;
  try {
    await voteController.validate(token);
    res.status(200).json({ message: 'Votes confirmed.' });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong!' });
    console.log(err);
  }
});

routes.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  const foundEmail = await voteController.filter(
    'user_votes',
    `email = '${email}'`
  );
  if (foundEmail.length === 0) {
    return res.status(200).end();
  }
  return res.status(400).end();
});

export default routes;
