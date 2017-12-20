# Creating a Facebook chatbot using IBM Watson technology 
 

Facebook Messenger App setting up
---------------------------------

In order to aloow user send messages to a chatboot we firstly need to create a Facebook Page for our bot:

1. Create a page on *facebook.com/pages/create*
2. Choose a category **Brand or product**
3. Choose a subcategory from a dropdrown menu and name your App
4. Click **Get Started**
5. Create an app on *developers.facebook.com/quickstarts*

Once an App is created:
1.   Go to the **Dashboard**
   - Click **Add Product** (left menu)
   - Choose **Messenger**
   - Click **Get Started**
   
  
2.   Find **Token Generation**
   - Select your page from dropdown menu **Page**
   - You will see a just generated **Token**, that will be used later in the node.js file
   
   
Local tunnel creating
---------------------

1. Install local tunnel globally to make it accessible for everyone:
$ npm install -g localtunnel

2. Start a webserver on some local port:
$ lt --port 5000

3. You will see a link. Save it!
 
   
Creating a Webhook with Node.js
-------------------------------

1. Create your app directory and set up your Node.js app:
$ npm init

2. Install Express and body-parser:
$ npm install express body-parser --save

3. Instantiate express and listen the server to port 5000\
(see the Node.js)

4. While creating HTTP GET and POST route method to handle the command, you should define a token. You will need it later.

5. - Go to your Facebook developer account again 
   - Choose Messanger Setting
   - At the Webhooks click **Setup Webhooks** 
   - Fill out the **Callback URL** with your link, adding "/webhook" 
   - Add a token that is written in your Node.js 


Connecting to IBM Watson 
------------------------

1. Create an account on Bluemix 
2. Go to **Watson Conversation**
3. Create dialogs
4. Go to Credentials
5. Add your workspaceID, username and pass to your code


Launch node.js 










