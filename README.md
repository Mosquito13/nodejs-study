# Module 12

## Sessions & Cookies

### Cookies

* Great for storing data on the client (browser)
* Do NOT store sensitive data here! It can be viewed + manipulated
* Cookies can be configured to expire when the browser is closed (=> "Session Cookie") or when a certain age/expiry date is reached (=> "Permanent Cookie")
* Works well together with Sessions...

### Sessions

* Stored on the server, NOT on the client
* Great for storing sensitive data that should survive across requests
* You can store ANYTHING in sessions
* Often used for storing user data/authentication status
* Identified via Cookie (don't mistake this with the term "Session Cookie")
* You can use different storages for saving your sessions on the server