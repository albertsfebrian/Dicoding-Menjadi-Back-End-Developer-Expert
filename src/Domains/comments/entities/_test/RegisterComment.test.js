const RegisterComment = require('../RegisterComment');

describe('a RegisterComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'ini content',
      threadId: 'thread-123',
    };
    expect(() => new RegisterComment(payload)).toThrowError('REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      content: 123,
      threadId: true,
      owner: 'user-123',
    };
    expect(() => new RegisterComment(payload)).toThrowError('REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registerComment object correctly', () => {
    const payload = {
      content: 'ini content',
      threadId: 'thread-123',
      owner: 'user-123',
    };
    const { title, body, owner } = new RegisterComment(payload);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
