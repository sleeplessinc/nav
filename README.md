
# Nav()

Nav() assists in buiding web-apps.
It supports navigation using the "pushstate" system of modern browsers.
It lets you navigate through pseudo-pages within an actual page
without any actual document fetching from the server.

This can be useful because it dramatically:

- reduces load on the web server
- reduced bandwidth requirements for both client and server
- increases user interface responsiveness for the user

However, because of its reliance on the query string arguments,
Nav() is not SEO friendly, even though the example simulates a simple website.
It is intended for navigation within a web-app with pages that
won't need to be indexed by search engines.

## Example

See index.html 


