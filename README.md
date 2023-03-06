# Newsletter-Signup


Newsletter Signup app
This is my First NodeJS project using Express.

A simple newsletter Signup webapp which prompts the user to fill First name, Last name and Email address to Signup for daily newsletter that can be delivered to their mail.
As the user press Signup button, the provided values are posted in the list of contacts on mailchimp server using API post request.

API key are stored privately in .env file and accessed using 'dotenv' module(API keys can't be publicly exposed). The file '.env' is ignored using .gitignore file.

If the user is successfully registered, they get redirected to success.html page and otherwise failure.html in case of any errors.



This web application is currently live at: https://newsletter-signup-ex7m.onrender.com

*********************************************
Disclaimer: All the data filled on the above website while Signing up can be accessed by me.
*********************************************
