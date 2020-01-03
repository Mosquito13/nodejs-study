# Module 13

## Adding Authentication

### Authentication

* Authentication means that not every visitor of the page can view and interact with everything
* Authentication has to happen on the server-side and builds up on sessions
* You can protect routes by checking the (session-controlled) login status right before you access a controller action

### Security & UX

* Passwords should be stored in a hashed form
* CSRF attacks are a real issue and you should therefore include CSRF protection in ANY application you build
* For a better user experience, you can flash data/messages into the session which you then can display in your views