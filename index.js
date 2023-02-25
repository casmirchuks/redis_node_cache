const express  =  require("express");
const fetch = require("node-fetch");
const redis  =  require("redis");
const { promisifyAll } = require('bluebird');
const PORT = process.env.PORT || 4600;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const app = express();

promisifyAll(redis);

const client = redis.createClient(REDIS_PORT);
client.connect();
client.on('connect', () => {
  console.log('connected to redis server');
  });


// Makes request to github api for data
async function getRepoNo(req, res, next) {
  try {
    console.log('Fetching data from github...');
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json();
    const repos = await data.public_repos;

    // Set repo number to redis
    res.send(setResonse(username, repos));
    runApplication(username, repos)
  } catch (error) {
    console.error(error);
    res.status(500)
  }
}

// Cache middleware

const runApplication = async (username, repos) => {
  // Connect to redis at 127.0.0.1 port 6379 no password.
  console.log('Fetching data from cache...');
  await client.set(username, repos);
  const usernameRepos = await client.get(username);
  console.log(`${username} has ${usernameRepos} repos on github`);
};

function setResonse(username, repos){
  return `<h2>${username} has ${repos} repos on github </h2>`;
}

app.get('/repos/:username', getRepoNo);

try {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
} catch (error) {
  console.error(error);
}