const ThreadDetailComment = require('../ThreadDetailComment');

describe('a ThreadDetailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'comment-123',
      username: 'bambang',
      date: '2021-08-08T07:22:33.555Z',
      is_deleted: false,
    };
    expect(() => new ThreadDetailComment(payload)).toThrowError('THREAD_DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      username: 'bambang',
      date: '2021-08-08T07:22:33.555Z',
      content: 'ini content',
      is_deleted: false,
    };
    expect(() => new ThreadDetailComment(payload)).toThrowError('THREAD_DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should called ThreadDetailComment constructComment object correctly', () => {
    const payload = {
      id: 'comment-123',
      username: 'bambang',
      date: '2021-08-08T07:22:33.555Z',
      content: 'ini content',
      is_deleted: false,
    };
    const replies = [];
    const likeCount = 0;
    const expectedValue = {
      id: 'comment-123',
      username: 'bambang',
      date: '2021-08-08T07:22:33.555Z',
      content: 'ini content',
      replies: [],
      likeCount: 0,
    };
    const comments = new ThreadDetailComment(payload).constructComment(replies, likeCount);
    expect(comments).toStrictEqual(expectedValue);
  });

  it('should called ThreadDetailComment constructComment object correctly (deleted)', () => {
    const payload = {
      id: 'comment-123',
      username: 'bambang',
      date: '2021-08-08T07:22:33.555Z',
      content: 'ini content',
      is_deleted: true,
    };
    const replies = [];
    const likeCount = 1;
    const expectedValue = {
      id: 'comment-123',
      username: 'bambang',
      date: '2021-08-08T07:22:33.555Z',
      content: '**komentar telah dihapus**',
      replies: [],
      likeCount: 1,
    };
    const comments = new ThreadDetailComment(payload).constructComment(replies, likeCount);
    expect(comments).toStrictEqual(expectedValue);
  });
});
