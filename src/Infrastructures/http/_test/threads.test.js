const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    const requestPayload = {
      title: 'init title',
      body: 'ini body',
    };

    it('should response 201 and thread created', async () => {
      const { server, headers, userData } = await ServerTestHelper.useServerWithAuth();
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
      expect(responseJson.data.addedThread.title).toStrictEqual(requestPayload.title);
      expect(responseJson.data.addedThread.owner).toStrictEqual(userData.id);
    });

    it('should response 401 when have not login', async () => {
      const server = await ServerTestHelper.useServer();
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const invalidRequestPayload = { ...requestPayload };
      delete invalidRequestPayload.body;
      const { server, headers } = await ServerTestHelper.useServerWithAuth();

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: invalidRequestPayload,
        headers,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const invalidRequestPayload = { ...requestPayload, body: true };
      const { server, headers } = await ServerTestHelper.useServerWithAuth();

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: invalidRequestPayload,
        headers,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    });
  });
});
