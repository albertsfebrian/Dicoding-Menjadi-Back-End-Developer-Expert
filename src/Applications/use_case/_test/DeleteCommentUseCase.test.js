const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockCommentRepository.verifyAvailableComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await deleteCommentUseCase.execute(useCasePayload);
    const { id, threadId, owner } = new DeleteComment(useCasePayload);
    expect(mockCommentRepository.verifyAvailableComment).toBeCalledWith(id);
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(id, owner);
    expect(mockCommentRepository.deleteComment).toBeCalledWith(id);
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(threadId);
  });
});
