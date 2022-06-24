class RegisteredThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, title, owner, body, date,
    } = payload;

    this.id = id;
    this.title = title;
    this.owner = owner;
    this.body = body;
    this.date = date;
  }

  _verifyPayload({
    id, title, owner, body, date,
  }) {
    if (!id || !title || !owner || !body || !date) {
      throw new Error('REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof owner !== 'string' || typeof body !== 'string' || typeof date !== 'string') {
      throw new Error('REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredThread;
