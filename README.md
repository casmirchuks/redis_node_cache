# Redis Node Cache

This is a simple Node.js application that demonstrates how to use Redis as a caching mechanism. The application uses the redis npm package to interact with Redis.

# Getting Started

## Prerequisites

Before you can run the application, you must have the following installed:

    Node.js
    Redis

# Installation

Clone the repository:

Install the dependencies:

cd redis-node-cache
npm install

Start the Redis Cli:

redis-cli

Start the application:

    node index.js

# Usage

The application exposes a REST API that allows you to cache and retrieve data.
Cache Data

To cache data, send a POST request to the /cache endpoint with a JSON payload that includes a key and a value.

# License

This project is licensed under the MIT License - see the LICENSE file for details.
