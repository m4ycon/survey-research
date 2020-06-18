import { Client } from 'pg';

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

  async create(email, votes) {
    const client = new Client(this.props);
    try {
      await client.connect();
      await client.query('BEGIN');
      const noRepeatedVotes = votes.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null));

      const langsIDs = [];
      noRepeatedVotes.map((curr) => langsIDs.push(curr.lang));

      await client.query(
        `INSERT INTO user_votes (email, votes)
        VALUES ('${email}', '{${langsIDs}}')`
      );

      noRepeatedVotes.forEach(async ({ weight, lang }) => {
        await client.query(
          `UPDATE lang
          SET votes = votes + ${weight}
          WHERE id = ${lang}`
        );
      });

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
