const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const POST_LIMIT = 10;
const MONGODB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'mern-app';

const client = new mongodb.MongoClient(MONGODB_URL, {
    useUnifiedTopology: true
});

console.log('Attempting to connect to MongoDB...');

client.connect(error => {
    if (error) return console.error(error);
    console.log('Connected to MongoDB.');
    client.close();
});

app.use(bodyParser.json());

app.use('/', express.static('build'));

app.get('/posts', async (req, res) => {
    const posts = await axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then(({ data }) => data.slice(0, POST_LIMIT))
          .catch(error => {
              console.error(error);
              return [];
          });
    
    return res.json({ posts });
});

app.post('/posts/create', async (req, res) => {
    const defaultPost = {
        userId: 0,
        title: '',
        body: ''
    };
    
    const newPost = await axios
          .post('https://jsonplaceholder.typicode.com/posts', {
              ...defaultPost,
              ...req.body
          })
          .then(({ data }) => data)
          .catch(error => {
              console.error(error);
              return {};
          });

    return res.json({ posts: [newPost] });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
