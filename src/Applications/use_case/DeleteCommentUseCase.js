const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { id, threadId, owner } = new DeleteComment(useCasePayload);
    await this._threadRepository.verifyAvailableThread(threadId);
    await this._commentRepository.verifyAvailableComment(id);
    await this._commentRepository.verifyCommentOwner(id, owner);
    await this._commentRepository.deleteComment(id);
  }
}

module.exports = DeleteCommentUseCase;
