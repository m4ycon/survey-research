<h1 align="center">
  <img src="https://github.com/m4ycon/survey-research/blob/master/just-vote.gif" height="500px">
</h1>

---

# About

This is a study repository, used to learn: postgres connection on node (without abstractions), and validating something (in this case, votes) by an email confirmation.

---

# Technologies used

- **Backend - NodeJS**
  - express
  - postgres
  - nodemailer
- **Frontend - ReactJS**
  - axios
  - react-sortablejs
  - react-router-dom
  - react-icons

---

# Pre-requisites

You need to have ```Node``` and ```Postgres``` installed, and an account on [mailgun](https://www.mailgun.com/), to have the email confirmation.

---

# How to install
- #### Setting up database
Open SQL Shell, and execute:
```
$ CREATE DATABASE votes;

// Default username is postgres
$ \c votes [username]

$ CREATE TABLE lang (
	id SERIAL PRIMARY KEY,
	lang VARCHAR NOT NULL UNIQUE,
	votes INTEGER
);

$ CREATE TABLE user_votes (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	votes INTEGER[] NOT NULL,
	token VARCHAR(255),
	verified BOOLEAN NOT NULL
);

// Insert some languages to vote
$ INSERT INTO lang (lang, votes) VALUES ('Java', 0);
INSERT INTO lang (lang, votes) VALUES ('C++', 0);
INSERT INTO lang (lang, votes) VALUES ('C#', 0);
INSERT INTO lang (lang, votes) VALUES ('Javascript', 0);
INSERT INTO lang (lang, votes) VALUES ('PHP', 0);
INSERT INTO lang (lang, votes) VALUES ('Python', 0);
INSERT INTO lang (lang, votes) VALUES ('Ruby', 0);
```

- #### BACKEND
Open cmd:
```bash
$ git clone https://github.com/m4ycon/survey-research.git
$ cd survey-research/backend
$ npm install
```
Now open survey-research/backend/src/config/mailer.js on an editor, and change the user and password, to the email and password provided by mailgun, it isn't so difficult to find and it's free. Then save.
Now on cmd:
```
$ npm run dev
```
- #### FRONTEND
Open another cmd:
```bash
$ cd survey-research/frontend
$ npm install
$ npm start
```

---

Made by Maycon :D
