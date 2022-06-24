const RegisterThread = require('../../../Domains/threads/entities/RegisterThread');
const RegisteredThread = require('../../../Domains/threads/entities/RegisteredThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'ini body',
      credentialId: 'user-DWrT3pXe1hccYkV1eIAxS',
    };
    const expectedRegisteredThread = new RegisteredThread({
      id: 'thread-h_W1Plfpj0TY7wyT2PUPX',
      title: useCasePayload.title,
      owner: useCasePayload.credentialId,
      body: useCasePayload.body,
      date: '2021-08-08T07:19:09.775Z',
    });

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedRegisteredThread));

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const registeredThread = await getThreadUseCase.execute(useCasePayload);

    expect(registeredThread).toStrictEqual(expectedRegisteredThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new RegisterThread(useCasePayload));
  });
});
