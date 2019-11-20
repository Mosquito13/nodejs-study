# Module 1

## Basics

### How the Web Works

Client => Request => Server => Response => Client

### Program Lifecycle & Event Loop

* Node.js runs non-blocking JS code and uses an event-driven code ("Event Loop") for running your logic
* A Node program exits as soon as there is no more work to do
    * Note the `createServer()` event never finishes by default

### Asynchronous Code

* JS code is non-blocking
* Use callbacks and events to order changes

### Requests & Responses

* Parse request data in chunks (Streams & Buffers)
* Avoid "double responses"

### Node.js & Core Modules

* Node.js ships with multiple core modules (http, fs, path, ...)
* Core modules can be imported into any file to be used there
    * Import via `require('module')`

### The Node Module System

* Import via `require('./path-to-file')` for custom files or `require('module')` for core & third-party modules
* Export via `module.exports` or just `exports`