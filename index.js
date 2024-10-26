const app = require('./server')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //console.log(`Server is listening on https://afaazi-server.onrender.com`);
  console.log(`Server is listening on http://localhost:${PORT}`);
});
