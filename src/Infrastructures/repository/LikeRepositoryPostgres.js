const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addLike(registerLike) {
    const { threadId, commentId, owner } = registerLike;
    const id = `like-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, threadId, commentId, owner],
    };

    const { rows } = await this._pool.query(query);

    return rows[0].id;
  }

  async verifyAvailableLike(threadId, commentId, owner) {
    const query = {
      text: 'SELECT id FROM likes WHERE thread_id = $1 AND comment_id = $2 AND owner = $3',
      values: [threadId, commentId, owner],
    };

    const { rowCount, rows } = await this._pool.query(query);

    if (rowCount === 0) return null;
    return rows[0].id;
  }

  async deleteLike(id) {
    const query = {
      text: 'DELETE FROM likes WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rowCount } = await this._pool.query(query);

    if (rowCount === 0) {
      throw new InvariantError('Gagal menghapus likes');
    }
  }

  async getLikeCountByCommentId(commentId) {
    const query = {
      text: 'SELECT id FROM likes WHERE comment_id = $1',
      values: [commentId],
    };

    const { rowCount } = await this._pool.query(query);
    return rowCount;
  }
}

module.exports = LikeRepositoryPostgres;
