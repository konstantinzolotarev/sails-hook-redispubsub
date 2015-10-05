# Sails.js Redis PubSub hook

**This hook is in development and has very limited functionnality please feel free to create issues and new features requests**

Main idea of the hook is to give application written with Sails.js ability to communicate with each other using redis Pub/Sub.

To send message you could use this method:
```javascript
// Send message to all sails instances/servers/applications
sails.redispubsub.publish({
  event: 'clearCache',
  items: 'test'
});
```

Unfortunatelly right now you can receive messages only in `config/redispubsub.js` file using `onMessage(channel, message)` method.

Example `config/redispubsub.js`:
```javascript

module.exports.redispubsub = {

  onMessage: function(channel, message) {
    console.log(message);
  }
};

```

```javascript

module.exports.redispubsub = {

  onMessage: require('../api/services/RedisPubSubService').onMessage //Bind to service
};

```

## Configuration

This hook support redis connection options (full list of options you could find [here](https://github.com/NodeRedis/node_redis#overloading)):

```javascript

module.exports.redispubsub = {
  connection: {
    options: {
      host: 'localhost',
      port: 6370
    },

    /**
     * Channel name of redis pub/sub
     * @type {String}
     */
    channel: 'sails-new'
  },

  onSubscribe: function(channel, count) {
    console.log(channel, count);
  },

  onError: function(err) {
    console.log(err);
  },

  onMessage: function(channel, message) {
    console.log(message);
  }
};

```
