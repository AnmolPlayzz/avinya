const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/lost-items', (req, res) => {
  // handle database retrieval here
  res.send([{
    id: 3, name: 'Phone', description: 'iPhone 12, black case', dateLost: '2023-10-03'
  }]);
});

app.post('/lost-items', (req, res) => {
  console.log(req.body);
  const { name, description } = req.body;
  console.log(`Received item: ${name}, ${description}`);
  res.send('Item added!');
})

app.get('/scholarships', (req, res) => {
  // handle database retrieval here
  res.send([{
    id: 1, name: 'Scholarship A', description: 'Description of Scholarship A'
  }, {
    id: 2, name: 'Scholarship B', description: 'Description of Scholarship B'
  }]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});