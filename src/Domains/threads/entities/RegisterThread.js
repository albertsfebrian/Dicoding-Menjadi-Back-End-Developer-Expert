class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { title, body, credentialId } = payload;

    this.title = title;
    this.body = body;
    this.credentialId = credentialId;
  }

  _verifyPayload({ title, body, credentialId }) {
    if (!credentialId) {
      throw new Error('UNAUTHORIZE_USE_CASE.USER_NOT_AUTHORIZE');
    }

    if (!title || !body) {
      throw new Error('REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterUser;
