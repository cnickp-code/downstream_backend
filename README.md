# DownStream Backend

Backend serving DownStream, an event management web app for online music streaming festivals!

**User**
----
  Posts user credentials to DB and returns json data about a single user.

* **URL**

  /api/users

* **Method:**

  `POST`
  
*  **URL Params**

   <!-- **Required:** -->
    None

* **Data Params**

   `user_name: string`
   `password: string`
   `email: string`
   `date_create: date`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id : 12, name : "Michael Bloom", email: "fake@fake.com", date_created: "2029-01-22T16:28:32.615Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "User already taken" }`

**Login**
----
  Posts login attempt and returns JSON web token

* **URL**

  /api/auth/login

* **Method:**

  `POST`
  
*  **URL Params**

   <!-- **Required:** -->
    None

* **Data Params**

   `user_name: string`
   `password: string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTQ3OTM0NTYsInN1YiI6IlppeGl0aCJ9.lNvljUQa_HIKvBNRT4TkCqEFSUP6hu_S1uY2t0Q6p_g" }`

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Incorrect user name or password" }`

**Event**
----
  Get all events from database, and post new events individually.

* **URL**

  /api/events

* **Method(s):**

  `GET`
  `POST`
  
*  **URL Params**

   GET: None
   POST: None

* **Data Params**

    GET: None
    POST:
    `name: string` 
    `image_url: string`
    `info_url: string`
    `stream_url: string`
    `description: string`
    `platform : string`
    `genre: string`
    `start_date: date`
    `end_date: date`
    `artists: string`

* **Success Response:**
  * **GET:**
    **Code:** 200 <br />
    **Content:** `{ "id": 1, "name": "Lost Lands", "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg", "info_url": "https://www.google.com", "stream_url": "https://www.facebook.com", "description": "test description 1", "platform": "twitch", "genre": "dubstep", "start_date": "2029-01-22T16:28:32.615Z", "end_date": "2029-01-22T16:28:32.615Z", "event_popularity": "6", "artists": "Downlink, Excision" }`

  * **POST:**
    **Code:** 201 <br />
    **Content:** `{ "id": 1, "name": "Lost Lands", "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg", "info_url": "https://www.google.com", "stream_url": "https://www.facebook.com", "description": "test description 1", "platform": "twitch", "genre": "dubstep", "start_date": "2029-01-22T16:28:32.615Z", "end_date": "2029-01-22T16:28:32.615Z", "event_popularity": "6", "artists": "Downlink, Excision" }`

 
* **Error Response:**

  * **GET:**
    None

  * **POST:**
    **Code:** 404 <br />
    **Content:** `{ error : "Missing key in request body" }`

**Individual Event**
----
  Get individual event from database

* **URL**

  /api/event/:event_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    `id=[integer]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "id": 1, "name": "Lost Lands", "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg", "info_url": "https://www.google.com", "stream_url": "https://www.facebook.com", "description": "test description 1", "platform": "twitch", "genre": "dubstep", "start_date": "2029-01-22T16:28:32.615Z", "end_date": "2029-01-22T16:28:32.615Z", "event_popularity": "6", "artists": "Downlink, Excision" }`

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Event doesn't exist" }`

**Schedule**
----
  Get events from logged in user's schedule
  Post events to logged in user's schedule 

* **URL**

  /api/schedule

* **Method(s):**

  `GET`
  `POST`
  
*  **URL Params**

   GET: None
   POST: None

* **Data Params**

    GET: None
    POST:
    `id: integer`
    `event_id: integer`
    `name: string`
    `image_url: string`
    `stream_url: string`
    `info_url: string`
    `description: string`
    `platform: string`
    `genre: string`
    `start_date: date`
    `end_date: date`
    `event_popularity: integer`
    `artists: string`

* **Success Response:**
  * **GET:**
    **Code:** 200 <br />
    **Content:** `{"id": 4, "event_id": 1, "name": "Lost Lands", "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg", "stream_url": "https://www.facebook.com", "info_url": "https://www.google.com", "description": "test description 1", "platform": "twitch", "genre": "dubstep", "start_date": "2029-01-22T16:28:32.615Z", "end_date": "2029-01-22T16:28:32.615Z", "artists": "Downlink, Excision" }`

  * **POST:**
    **Code:** 201 <br />
    **Content:** `{"id": 4, "event_id": 1, "name": "Lost Lands", "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg", "stream_url": "https://www.facebook.com", "info_url": "https://www.google.com", "description": "test description 1", "platform": "twitch", "genre": "dubstep", "start_date": "2029-01-22T16:28:32.615Z", "end_date": "2029-01-22T16:28:32.615Z", "artists": "Downlink, Excision" }`

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Event doesn't exist" }`

**Individual Schedule Event**
----
  Get individual schedule event from database
  Delete individual event from schedule

* **URL**

  /api/schedule/:schedule_id

* **Method(s):**

  `GET`
  `DELETE`
  
*  **URL Params**

   **Required:**
    `id=[integer]`

* **Data Params**

   None

* **Success Response:**

  * **GET**
    **Code:** 200 <br />
    **Content:** `{"id": 4, "event_id": 1, "name": "Lost Lands", "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg", "stream_url": "https://www.facebook.com", "info_url": "https://www.google.com", "description": "test description 1", "platform": "twitch", "genre": "dubstep", "start_date": "2029-01-22T16:28:32.615Z", "end_date": "2029-01-22T16:28:32.615Z", "artists": "Downlink, Excision" }`

  * **DELETE**
    **Code:** 204 <br />
    **Content:** None

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Event doesn't exist" }`