class ThreadDetailComments {
  constructor(payload) {
    this._verifyPayload(payload);
    this.comments = this._constructComments(payload);
  }

  _verifyPayload(payload) {
    if (!payload) {
      throw new Error('THREAD_DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!Array.isArray(payload)) {
      throw new Error('THREAD_DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _constructComments(comments) {
    return comments.map((comment) => {
      const {
        id, username, content, date, is_deleted,
      } = comment;
      return {
        id,
        username,
        date,
        content: is_deleted ? '**komentar telah dihapus**' : content,
      };
    });
  }
}

module.exports = ThreadDetailComments;
