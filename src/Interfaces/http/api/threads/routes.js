const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadsHandler,
  },
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentsHandler,
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentsHandler,
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadsHandler,
  },
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postReplyCommentHandler,
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.postReplyCommentHandler,
  },
]);

module.exports = routes;
