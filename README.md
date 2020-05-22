# Module 17

## Error Handling

### Types of Errors & Handling Errors

* You can differentiate between different types of errors - technical errors (which are thrown) and "expected errors" (e.g. invalid user input)
* Error handling can be done with custom if-checks, try-catch, then()-catch() etc
* You can use the Express error handling middleware to handle all unhandled errors

### Errors & Status Code

* When returning responses, it can make sense to also set an appropriate HTTP Status Code - this lets the browser know what went wrong
* You got success (2xx), redirect (3xx), client-side errors (4xx) and server-side errors (5xx) codes to choose from
* Setting status code does not mean that the response is incomplete or the app crashed

