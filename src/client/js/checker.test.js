const urlCheck = require('./checkUrl');
let sampleUrl = 'https://www.nbcnews.com/politics/white-house/biden-called-trump-putin-s-puppy-president-elect-may-put-n1251983'
test('checks url', () => {
  expect(urlCheck(sampleUrl)).toBe(true);
});