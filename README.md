# Delve Directory - API
##### Client for [Delve Directory - Client](https://github.com/SeannyPhoenix/delve-directory-client)
##### Created by [Seanny Drakon Phoenix](https://www.github.com/seannyphoenix)

### Project Planning Deliverables

* Scope

  Many people love playing table-top roleplaying games. Unfortunately, it can be difficult to find people to play with. *Delve Directory* will allow game runners, players, and hosts to connect with others to fill tables and enjoy what they love.

* User Stories

  Users can view available seats at tables in specified locations or online.
  Users can create accounts.
  Users can create tables with specified seats.
  Users can request to join an existing table.
  Users can send messages to each other or to the feed of a table to which they have a seat.

* Wireframes

* Data Models

  User |
  -----|
  screenName|
  email|
  password|
  [games]|

  Games |
  ------|
  name|
  publisher|
  website|

  Table |
  ------|
  owner|
  location|
  game|
  [seats {role, user}]|

  Message |
  --------|
  table|
  sender|
  content|

* Milestones

  1. Implement Users
    * Register
    * Log In
    * Log Out
  2. Implement Tables
    * Create table
    * List tables
    * Request seat
    * Assign seat
  3. Implement Location Search
    * Filter tables by game and role
    * Search tables in a location
    * Show tables in a zip code
    * Show tables in a specified radius
  4. Implement Scroll Menu
    * Create sliding menu
    * Add map-style menu
    * Highlight current room
  5. Messaging
    * Send message to other user.
    * Send message to table feed.

* Feasibility Study

  * Packages
    * [Leaflet](https://leafletjs.com/)
    * [React Leaflet](https://react-leaflet.js.org/)
    * [FontAwesome](https://fontawesome.com/)
    * [geolib](https://github.com/manuelbieh/geolib#readme)
  * APIs
    * [Nominatim](https://nominatim.org/)
  * Data
    * [US Zip Code Latitude and Longitude](https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/table/)
