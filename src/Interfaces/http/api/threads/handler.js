const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadsHandler = this.postThreadsHandle.bind(this);
    // this.postCommentsHandler = this.postCommentsHandler.bind(this);
    // this.deleteCommentsHandler = this.deleteCommentsHandler.bind(this);
    // this.getThreadsHandler = this.getThreadsHandler.bind(this);
    // this.postReplyCommentHandler = this.postReplyCommentHandler.bind(this);
    // this.postReplyCommentHandler = this.postReplyCommentHandler.bind(this);
  }

  async postThreadsHandle(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const payload = {
      ...request.payload,
      credentialId,
    };
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
