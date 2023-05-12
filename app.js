const http = require('http');

const server = http.createServer((req, res) => {
  res.end('"DEVOPS" stands for "Development and Operations." DevOps is a software development process with the aim of enhancing the speed, quality, and dependability of product delivery. It places an emphasis on collaboration and communication between development teams and IT operations teams. It refers to the practise of fusing software development and IT operations into a single, integrated process. The term "DevOps" does not have a full form as such.');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
