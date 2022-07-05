const RegisterLike = require('../../Domains/likes/entities/RegisterLike');

class LikeUseCase {
  constructor({ likeRepository, commentRepository, threadRepository }) {
    this._likeRepository = likeRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const registerLike = new RegisterLike(useCasePayload);
    const { threadId, commentId, owner } = registerLike;
    await this._threadRepository.verifyAvailableThread(threadId);
    await this._commentRepository.verifyAvailableComment(commentId);
    const id = await this._likeRepository.verifyAvailableLike(threadId, commentId, owner);
    if (id) await this._likeRepository.deleteLike(id);
    else await this._likeRepository.addLike(registerLike);
  }
}

module.exports = LikeUseCase;
