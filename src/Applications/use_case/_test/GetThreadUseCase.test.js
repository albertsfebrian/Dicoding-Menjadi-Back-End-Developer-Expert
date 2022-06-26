const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadDetailComments = require('../../../Domains/comments/entities/ThreadDetailComments');

describe('GetThreadUseCase', () => {
  it('should throw error if use case payload not contain threadId', async () => {
    const getThreadUserUseCase = new GetThreadUseCase({});
    await expect(getThreadUserUseCase.execute())
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.NOT_CONTAIN_THREAD_ID');
  });

  it('should throw error if threadId not string', async () => {
    const useCasePayload = 123;
    const getThreadUserUseCase = new GetThreadUseCase({});
    await expect(getThreadUserUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the get thread action correctly', async () => {
    const threadId = 'thread-123';
    const threadData = {
      id: threadId,
      title: 'ini title',
      body: 'ini body',
      date: '2021-08-08T07:22:33.555Z',
      username: 'budi',
    };
    const commentData = [
      {
        id: 'comment-123',
        username: 'bambang',
        date: '2021-08-08T07:22:33.555Z',
        content: 'ini content',
        is_deleted: false,
      },
      {
        id: 'comment-124',
        username: 'jono',
        date: '2021-08-08T07:22:33.555Z',
        content: 'ini content',
        is_deleted: true,
      },
    ];
    const expectedValue = {
      id: threadId,
      title: 'ini title',
      body: 'ini body',
      date: '2021-08-08T07:22:33.555Z',
      username: 'budi',
      comments: new ThreadDetailComments(commentData).comments,
    };
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(threadData));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(commentData));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const registeredThread = await getThreadUseCase.execute(threadId);

    expect(registeredThread).toStrictEqual(expectedValue);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(threadId);
  });
});
