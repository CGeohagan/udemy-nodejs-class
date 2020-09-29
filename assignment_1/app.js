const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const users = [];

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Hi friend</title></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="create-user"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  } 
  
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Hi friend</title></head>');
    res.write('<body><ul>');
    console.log('again', users);
    users.forEach(user => res.write(`<li>${user}</li>`));
    res.write('</ul></body>');
    res.write('</html>');
    return res.end();
  } 
  
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      users.push(message);
      console.log(users);
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      return res.end();
    });
  }
});

server.listen(3000);