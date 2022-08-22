
# How to install this app:

## Step 1: Create .env file and enter the following:
```
SENDGRID_API_KEY = your-api-key

MAILGUN_API_KEY = your-api-key

MAILGUN_DOMAIN = your-acct-sandbox-domain
```
## Step 2:

`` npm install ``

`` npm start ``


## Which language, framework, and libraries you chose and why?
Used Node/Javascript because that is what I am more familiar with. 

## Tradeoffs you may have made, anything you left out, or what you might do differently if you were to spend additional time on the project.
Default mailer can be configured in line 5.
I am not entirely confident what I did is ideal. It might have been better to create a separate function for error handling in regard to firing the other service when the default is down. 
I would have included unit testing if I had more time.

## How much time you spent on the exercise.
3-4 hours

## Anything else you wish to include.
The architecture for this project I leveraged from another project that is similar.  Please focus your attention on sendEmail.js:
https://github.com/gtrapp/mailGun_Sendgrid_transactional_email/blob/main/controllers/sendEmail.js

