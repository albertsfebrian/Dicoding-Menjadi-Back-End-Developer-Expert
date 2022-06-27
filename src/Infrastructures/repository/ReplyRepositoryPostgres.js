const RegisteredReply = require('../../Domains/replies/entities/RegisteredReply');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(registerReply) {
    const {
      content, threadId, commentId, owner,
    } = registerReply;
    const id = `reply-${this._idGenerator()}`;
    const date = new Date().toISOString();
    const isDeleted = false;

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, content, owner',
      values: [id, threadId, commentId, content, owner, date, isDeleted],
    };

    const result = await this._pool.query(query);

    return new RegisteredReply({ ...result.rows[0] });
  }
}

module.exports = ReplyRepositoryPostgres;
