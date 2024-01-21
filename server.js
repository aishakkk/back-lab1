const express = require('express');
const http = require('http');

const sse = require('express-sse');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const eventStream = new sse();

app.use(express.static('mychat'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/json', (req, res) => {
  res.json({ text: 'hi', numbers: [1, 2, 3] });
});

app.get('/echo', (req, res) => {
  const input = req.query.input || '';
  const response = {
    normal: input,
    shouty: input.toUpperCase(),
    charCount: input.length,
    backwards: input.split('').reverse().join('')
  };
  res.json(response);
});

app.get('/chat', (req, res) => {
  const message = req.query.message || '';
  eventStream.send(message);
  res.send('Message sent successfully.');
});

app.get('/sse', sse.init);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
