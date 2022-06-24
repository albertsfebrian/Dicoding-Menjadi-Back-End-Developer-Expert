const RegisteredThread = require('../RegisteredThread');

describe('a RegisteredThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'thread-h_W1Plfpj0TY7wyT2PUPX',
      title: 'ini title',
      owner: 'user-CrkY5iAgOdMqv36bIvys2',
      body: 'ini body',
    };

    expect(() => new RegisteredThread(payload)).toThrowError('REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: true,
      title: 123,
      owner: 'user-CrkY5iAgOdMqv36bIvys2',
      body: 'ini body',
      date: {},
    };

    expect(() => new RegisteredThread(payload)).toThrowError('REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registeredThread object correctly', () => {
    const payload = {
      id: 'thread-h_W1Plfpj0TY7wyT2PUPX',
      title: 'ini title',
      owner: 'user-CrkY5iAgOdMqv36bIvys2',
      body: 'ini body',
      date: '2021-08-08T07:19:09.775Z',
    };
    const registeredThread = new RegisteredThread(payload);

    expect(registeredThread.id).toEqual(payload.id);
    expect(registeredThread.title).toEqual(payload.title);
    expect(registeredThread.owner).toEqual(payload.owner);
    expect(registeredThread.body).toEqual(payload.body);
    expect(registeredThread.date).toEqual(payload.date);
  });
});
