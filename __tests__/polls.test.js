import handler from '../pages/api/polls';

const httpMocks = require('node-mocks-http');

async function testApiHandler({ method, body, query = {} }) {
  const req = httpMocks.createRequest({
    method,
    url: '/api/polls',
    query,
    body,
  });
  const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

  await new Promise((resolve, reject) => {
    res.on('end', resolve);
    res.on('error', reject);
    handler(req, res);
  });

  return { req, res };
}

describe('Polls API Endpoint', () => {
  it('creates a new poll', async () => {
    const { res } = await testApiHandler({
      method: 'POST',
      body: { question: 'Test Question?', options: ['Option 1', 'Option 2'] },
    });

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('pollId');
    expect(data.question).toBe('Test Question?');
    expect(data.options).toEqual(['Option 1', 'Option 2']);
  }, 10000);

  // More tests
});
