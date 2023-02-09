# personal-site

This is my personal website. You can visit it at [jamesleakos.com](http://www.jamesleakos.com).

## tech stack
Deployed on AWS EC2, S3, and Mongo Cloud Atlas
* RESTful API service on the EC2
* Images stored on S3 (delivered via ImageKit and Cloudfront)
* Mongo DB on Cloud Atlas
* HTTPS through Route 53

Express.js with passport.js for authentication
* all access to deployed services managed via protected routes

React and React-Router
* posts have unique link
