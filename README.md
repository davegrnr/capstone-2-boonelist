# BooneList

## Initialization
 - boonelist-client/ 
    - "npm install"
 - boonelist-server/ 
   - "npm install"
   - "psql < boonelist.sql"
   - "npm start"

# Project Objective:
1. ### Actors Involved:  
 - User: Create a profile, make/remove new items posts, make/remove new services posts, edit profile, comment on other user posts, like other user posts.
 -  Admin: Same as user but able to remove other posts or comments

2. ### Auth Module:
 -  Login Page - log in with email/password JWT token using bcrypt
3. ###  Home page:  
 - Renders welcome message and shows nav with post routes for new items or services
 - Renders nav route to edit user profile
4. ### Services page:
 - This route and following endpoints accessible only to logged in users
 - Renders other user posts and provides access to more details through link
 - Access link to post a new service
5. ### Sales page:
 - This route and following endpoints accessible only to logged in users
 - Renders other user posts and provides access to more details through link
 - Access link to post a new item for sale
6. ### Service/sale detail page:
 - Renders more information about a service or sale(item)
 - Renders comments and likes from other users
 - Renders form to post new comment
7. ### Post new service/sale page:
 - Renders form to post a new sale or service
8. ### User Profile Page:
 -  Current user can edit their information

# Technical details
1. ### Frontend:  
 - React.js

2. ### Backend:
 -  Node
 
3. ###  Database:  
 - PostgreSQL
 
4. ###  Hosting:  
 -  Heroku
