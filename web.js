const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var contexts = [];

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'hsg-chat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          getWatson(event);
        }
      });
    });
    res.status(200).end();
  }
});
  
  
function getWatson(event){
  var number = event.sender.id;
  var message = event.message.text;
  
  var context = null;
  var index = 0;
  var contextIndex = 0;
  
  contexts.forEach(function(value){
    console.log(value.from)
    if (value.from == number){
      context = value.context;
      contextIndex = index;
    }
    index = index + 1;
  });
 
 
 console.log('Recieved message from ' + number + ' saying \'' + message  + '\'');

  var conversation = new ConversationV1({
    username: '',
    password: '',
    version_date: ''
  });

  console.log(JSON.stringify(context));
  console.log(contexts.length);

  conversation.message({
    input: { text: message },
    workspace_id: '',
    context: context
   }, function(err, response) {
       if (err) {
         console.error(err);
       } else {
         console.log(response.output.text[0]);
         if (context == null) {
           contexts.push({'from': number, 'context': response.context});
         } else {
           contexts[contextIndex].context = response.context;
         }

         var intent = response.intents[0].intent;
         console.log(intent);
         if (intent == "done") {
           //contexts.splice(contexts.indexOf({'from': number, 'context': response.context}),1);
           contexts.splice(contextIndex,1);
         }

         
         request({
           url: 'https://graph.facebook.com/v2.6/me/messages',
           qs: {access_token: PAGE_ACCESS_TOKEN},
           method: 'POST',
           json: {
            recipient: {id: number},
            message: {text: response.output.text[0]}
           }
         }, function (error, response) {
           if (error) {
              console.log('Error sending message: ', error);
           } else if (response.body.error) {
               console.log('Error: ', response.body.error);
           }
         });
        }
    });
}  
  
