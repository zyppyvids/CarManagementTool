# Simple Car API

A simple car API that consists of all CRUD operations done on the models:

    1. 'Car' - [GET], [POST], [PUT], [DELETE].
    2. 'CarModel' - [GET], [POST], [PUT], [DELETE].
    3. 'CarMake' - [GET], [POST], [PUT], [DELETE].


## App structure

The app is structured with a Backend part done in Django & Django Ninja (Python) and a Frontend done in React (JS) with Bootstrap.

![App Structure](https://www.plantuml.com/plantuml/png/XOz12u9048Nl-oiUdkoWFq4q8Y8wc7eJ3vCELgQxx8v4HFyzmulGmUity_ZUYvsGbR5_834c5plMCbfM3GbTo36y_7ow2NjGXkgEsXz94mzl1G1bnbGB_6E-gMQmrLgSM3AL-YXrA8eK0ShTdOPM8sCds5lg-Qbj1pzzoLKFKtJj0K64ScvIgQKKOHWjfF_7TNVCGpFj_m80)

## Classes

The database consists of three models:
    
    1. Car (id, VIN, carplate, modelid)
    2. CarModel (id, model, year, carmakeid)
    3. CarMake (id, name)
    
There is Django and React JS Validation for fields:

    1. VIN - should be 10 characters long, consisting only of numbers.
    2. Car's Plate - should be 8 characters long, in the form of 'AA1234BB'.
    3. All relational fields should be part of the queries.

![Class diagram](https://www.plantuml.com/plantuml/png/TL2z2i903Dxx51aLwGjqa49TEkWYk8SsbEBbbFGwYFZkNbhILk7WXdp9zvDBEGIKCBA3ok4md7hi13bh54250kyC8AzzWBxLwXgazntSwii6DIXFXu6Coe-MtCIFxp2BTtkjL_aFDeFO_6Hh-5bz4XjC6Hly8XGZDYYCTuhyHFuaNZec_q-F5ebmZqmfRvtDJdg-F3ykFocMmrX7nnPLRDOkoRSZkoy0)

## Updates

Feel free to make pull requests for me to update the simple yet interesting example app! :)

## To start

    1. Install Python 3 and Django.
    2. Install npm.
    3. Run a `npm install` inside the ReactJS folder.
    4. Run a `npm start` inside the same folder.
    5. Run a `python manage.py runserver` inside the Django API folder.

If for whatever reason the db.sqlite3 file is missing - run a `python manage.py migrate` to be able to create the database needed for the application.
