import { Client } from 'pg';
import crypto from 'crypto';
import mailer from '../services/mailer';

class VoteController {
  constructor() {
    this.props = {
      user: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'votes',
    };
  }

  async index(table) {
    const client = new Client(this.props);
    try {
      await client.connect();
      await client.query('BEGIN');
      const results = await client.query(`SELECT * FROM ${table}`);
      await client.query('COMMIT');
      return results.rows;
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(err);
    } finally {
      await client.end();
    }
  }

  async filter(table, where) {
    const client = new Client(this.props);
    try {
      await client.connect();
      const result = await client.query(`
        SELECT * FROM ${table} 
        WHERE ${where}
      `);
      return result.rows;
    } catch (err) {
      throw new Error(err);
    } finally {
      client.end();
    }
  }

  async validate(token) {
    const client = new Client(this.props);
    try {
      await client.connect();
      await client.query('BEGIN');

      const response1 = await client.query(`
        SELECT verified FROM user_votes
        WHERE token = '${token}'
      `);
      const verified = response1.rows[0].verified;

      if (!verified) {
        await client.query(`
          UPDATE user_votes
          SET verified = true
          WHERE token = '${token}'`);

        const response2 = await client.query(`
          SELECT votes FROM user_votes
          WHERE token = '${token}'`);

        const votes = response2.rows[0].votes;

        votes.map(async ({ [0]: lang, [1]: weight }) => {
          await client.query(
            `UPDATE lang
            SET votes = votes + ${weight}
            WHERE id = ${lang}`
          );
        });
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(err);
    } finally {
      await client.end();
    }
  }

  async createUser(email, votes) {
    const client = new Client(this.props);
    try {
      await client.connect();
      await client.query('BEGIN');

      // Removing possibly duplicated votes
      const noRepeatedVotes = votes.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null));

      // Formatting to insert on db
      const formattedVotes = [];
      noRepeatedVotes.map(elem =>
        formattedVotes.push(`{${elem.lang}, ${elem.weight}}`)
      );

      const token = crypto.randomBytes(32).toString('hex');

      // Inserting user
      await client.query(
        `INSERT INTO user_votes (email, votes, token, verified)
        VALUES ('${email}', '{${formattedVotes.join(',')}}', '${token}', false)`
      );

      // Send confirmation email
      const html = `
        Please, click on this link to confirm your vote: <br/>
        <a href="http://localhost:3333/validate/${token}">
          http://localhost:3333/validate/${token}
        </a>`;

      await mailer.sendEmail(
        'votes@contact.com',
        email,
        'Validating vote',
        html
      );

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(err);
    } finally {
      await client.end();
    }
  }
}

export default VoteController;
