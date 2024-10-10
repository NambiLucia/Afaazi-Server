const app = require('./server')

const PORT = 5000;
//process.env.PORT

app.listen(PORT, () => {
  //console.log(`Server is listening on https://afaazi-server.onrender.com`);
  console.log(`Server is listening on http://localhost:${PORT}`);
});
