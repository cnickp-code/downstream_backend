# DownStream 

# DownStream

https://downstream-frontend.vercel.app/

Have you ever found yourself browsing online in your pajamas at 2PM during this long and arduous quarantine period (I might or might not be speaking from experience) and you happen to spot an awesome music festival stream that is happening three days in the future? And have you ever found yourself four days later randomly remembering that same music festival stream, except now it already passed? This problem is a common occurrence for many a music lover in this unique day and age, where live music's outlet now comes packaged in virtual form. 

Introducing DownStream, the app that will help you to never miss a music stream ever again! DownStream provides a service that allows users to choose from a list of filterable online music events, complete with the name, description, dates, genre, and major artists that will be playing! Users who have an account will be allowed to add events that they want to add to their schedule. From there, users can manage their chosen events. Never again will you miss a music stream with DownStream!

## Motivation

This is a passion project. I love live music. One of my favorite pastimes is experiencing music in person, up close and personal. However, in this very unique situation of nationwide quarantine, all music events have been effectively tabled for the foreseeable future. Enter a new, exciting angle to the music industry that has never before been seen in this volume: online music festivals and streaming. It is quite frustrating to plan on watching certain artists, only to miss their stream completely either due to miscommunication or just simply forgetting. I hope to alleviate that frustration through this app.

My goal with this project is to contribute to the culture and the industry that I love and that has given me so much, from friends, to experiences that I will never forget. 

## Screenshots
![part-5r](https://user-images.githubusercontent.com/61900464/87834965-a599be80-c840-11ea-870d-15cff3b1d2b9.jpg)
![part-2r](https://user-images.githubusercontent.com/61900464/87834974-adf1f980-c840-11ea-95da-53d9f8e5d925.jpg)
![part-1r](https://user-images.githubusercontent.com/61900464/87834977-b0545380-c840-11ea-9d8b-334b80ebab68.jpg)
![part-0_2r](https://user-images.githubusercontent.com/61900464/87835274-894a5180-c841-11ea-9186-7290e904aa84.jpg)

## Tech used

React, NodeJS, PostgreSQL


----

# Backend Endpoints

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

   `user_name: string` <br />
   `password: string` <br />
   `email: string` <br />
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

   GET: None <br />
   POST: None

* **Data Params**

    GET: None <br />
    POST: <br />
    `name: string` <br />
    `image_url: string`<br />
    `info_url: string` <br />
    `stream_url: string` <br />
    `description: string` <br />
    `platform : string` <br />
    `genre: string` <br />
    `start_date: date` <br />
    `end_date: date` <br />
    `artists: string` <br />

* **Success Response:**
  * **GET:**
    **Code:** 200 <br />
    **Content:** <br />
    ```    
    {
        "id": 1,
        "name": "Hospitality Beach Party",
        "image_url": "https://showfomo.com/img/flyers/hospitality-beach-party-stream-2020-20200702215542.jpg",
        "info_url": "https://www.facebook.com/hospitalitydnb",
        "stream_url": "https://www.twitch.tv/hospitalrecordsofficial",
        "description": "A DNB Staycation",
        "platform": "twitch",
        "genre": "dnb",
        "start_date": "2020-07-10T19:00:00.000Z",
        "end_date": "2020-07-12T05:00:00.000Z",
        "event_popularity": "3",
        "artists": "Urbandawn, Camo & Krooked, Netsky, Black Sun Empire, Charlie Tee, S.P.Y, Djinn, Euphonique, Bladerunner, Fabio, Kyrist, Kasra, Unglued, Degs, Lens, Mizeyesis, Stay-C, GLXY, Riya, Inja's Sunday Service, NU:TONE, Fred V, London Elektricity, Tim Reaper"
    },
    ```

  * **POST:**
    **Code:** 201 <br />
    **Content:** <br />
    ```    
    {
        "id": 1,
        "name": "Hospitality Beach Party",
        "image_url": "https://showfomo.com/img/flyers/hospitality-beach-party-stream-2020-20200702215542.jpg",
        "info_url": "https://www.facebook.com/hospitalitydnb",
        "stream_url": "https://www.twitch.tv/hospitalrecordsofficial",
        "description": "A DNB Staycation",
        "platform": "twitch",
        "genre": "dnb",
        "start_date": "2020-07-10T19:00:00.000Z",
        "end_date": "2020-07-12T05:00:00.000Z",
        "event_popularity": "3",
        "artists": "Urbandawn, Camo & Krooked, Netsky, Black Sun Empire, Charlie Tee, S.P.Y, Djinn, Euphonique, Bladerunner, Fabio, Kyrist, Kasra, Unglued, Degs, Lens, Mizeyesis, Stay-C, GLXY, Riya, Inja's Sunday Service, NU:TONE, Fred V, London Elektricity, Tim Reaper"
    },
    ```

 
* **Error Response:**

  * **GET:** <br />
    None

  * **POST:** <br />
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
    **Content:** <br />
    ```    
    {
        "id": 1,
        "name": "Hospitality Beach Party",
        "image_url": "https://showfomo.com/img/flyers/hospitality-beach-party-stream-2020-20200702215542.jpg",
        "info_url": "https://www.facebook.com/hospitalitydnb",
        "stream_url": "https://www.twitch.tv/hospitalrecordsofficial",
        "description": "A DNB Staycation",
        "platform": "twitch",
        "genre": "dnb",
        "start_date": "2020-07-10T19:00:00.000Z",
        "end_date": "2020-07-12T05:00:00.000Z",
        "event_popularity": "3",
        "artists": "Urbandawn, Camo & Krooked, Netsky, Black Sun Empire, Charlie Tee, S.P.Y, Djinn, Euphonique, Bladerunner, Fabio, Kyrist, Kasra, Unglued, Degs, Lens, Mizeyesis, Stay-C, GLXY, Riya, Inja's Sunday Service, NU:TONE, Fred V, London Elektricity, Tim Reaper"
    },
    ```

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Event doesn't exist" }`

**Schedule**
----
  Get events from logged in user's schedule <br />
  Post events to logged in user's schedule  <br />

* **URL**

  /api/schedule 

* **Method(s):**

  `GET` <br />
  `POST`
  
*  **URL Params**

   GET: None <br />
   POST: None

* **Data Params**

    GET: None <br />
    POST: <br />
    `id: integer` <br />
    `event_id: integer` <br />
    `name: string` <br />
    `image_url: string` <br />
    `stream_url: string` <br />
    `info_url: string` <br />
    `description: string` <br />
    `platform: string` <br /> 
    `genre: string`<br />
    `start_date: date`<br />
    `end_date: date`<br />
    `event_popularity: integer`<br />
    `artists: string`<br />

* **Success Response:**
  * **GET:**<br />
    **Code:** 200 <br />
    **Content:**  <br /> 
    ```  
    {
        "id": 4,
        "event_id": 1,
        "name": "Lost Lands",
        "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg",
        "stream_url": "https://www.facebook.com",
        "info_url": "https://www.google.com",
        "description": "test description 1",
        "platform": "twitch",
        "genre": "dubstep",
        "start_date": "2029-01-22T16:28:32.615Z",
        "end_date": "2029-01-22T16:28:32.615Z",
        "artists": "Downlink, Excision"
    },
    ```

  * **POST:**<br />
    **Code:** 201 <br />
    **Content:** <br />
    ```    
    {
        "id": 4,
        "event_id": 1,
        "name": "Lost Lands",
        "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg",
        "stream_url": "https://www.facebook.com",
        "info_url": "https://www.google.com",
        "description": "test description 1",
        "platform": "twitch",
        "genre": "dubstep",
        "start_date": "2029-01-22T16:28:32.615Z",
        "end_date": "2029-01-22T16:28:32.615Z",
        "artists": "Downlink, Excision"
    },
    ```

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Event doesn't exist" }`

**Individual Schedule Event**
----
  Get individual schedule event from database<br />
  Delete individual event from schedule

* **URL**

  /api/schedule/:schedule_id

* **Method(s):**

  `GET`<br />
  `DELETE`
  
*  **URL Params**

   **Required:**
    `id=[integer]`

* **Data Params**

   None

* **Success Response:**

  * **GET**<br />
    **Code:** 200 <br />
    **Content:** <br />
    ```  
    {
        "id": 4,
        "event_id": 1,
        "name": "Lost Lands",
        "image_url": "https://www.lostlandsfestival.com/wp-content/uploads/2020/05/preview-lightbox-TeaserGraphic_1920x1080_2-1200x675.jpg",
        "stream_url": "https://www.facebook.com",
        "info_url": "https://www.google.com",
        "description": "test description 1",
        "platform": "twitch",
        "genre": "dubstep",
        "start_date": "2029-01-22T16:28:32.615Z",
        "end_date": "2029-01-22T16:28:32.615Z",
        "artists": "Downlink, Excision"
    },
    ```

  * **DELETE**
    **Code:** 204 <br />
    **Content:** None

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Event doesn't exist" }`