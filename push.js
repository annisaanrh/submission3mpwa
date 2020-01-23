var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPAZMCpbZjeG4jh2fbBeYTAjlnpIVwqcrR7Lo9Y_EgaeSsfqTu--K1DkmqFlbEMW2lvbP8uz7Vtejk3GWkQ3JyY",
   "privateKey": "tJjoeiaJp7o-5DvrEw3i5VoU4wZmleOulRikr8puMN0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fak_GKXUCGA:APA91bF1BB8ySLgb4eJ8A59jI5IaWLIhQN8-5yi0qyhEYZQDIBBWtVSby2wyMIj3bu4yS3J-6iX-ryt_V-GYjg83Kl6qGEAeh5Umthbj0E8dpq5RcZlSoQolyzfb8bt7E1UpkqzWIsif",
   "keys": {
       "p256dh": "BDsY7nuH145kxNfcwZyG2XwZjtLEEWRGCWs/hrP2u+Al8CyHh1wLtRjEeDHL1ygJ4QipkTpDpsjQ6SzFLirWXTc=",
       "auth": "6rC6SfyvuaH/aEiL3y7GZA=="
   }
};
var payload = 'Selamat Datang di Submission-2 Annisaa';
 
var options = {
   gcmAPIKey: '970533837091',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);