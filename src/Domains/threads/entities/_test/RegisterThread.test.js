const RegisterThread = require('../RegisterThread');

describe('a RegisterThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'ini title',
      body: 'ini body',
    };

    expect(() => new RegisterThread(payload)).toThrowError('UNAUTHORIZE_USE_CASE.USER_NOT_AUTHORIZE');
  });

  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'ini title',
      credentialId: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    expect(() => new RegisterThread(payload)).toThrowError('REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      title: true,
      body: 123,
      credentialId: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    expect(() => new RegisterThread(payload)).toThrowError('REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registerThread object correctly', () => {
    const payload = {
      title: 'ini title',
      body: 'ini body',
      credentialId: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    const { title, body, credentialId } = new RegisterThread(payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(credentialId).toEqual(payload.credentialId);
  });
});
