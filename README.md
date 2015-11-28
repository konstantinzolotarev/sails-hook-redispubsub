# Sails.js Redis PubSub hook

[![npm version](https://badge.fury.io/js/sails-hook-redispubsub.svg)](https://badge.fury.io/js/sails-hook-redispubsub)
[![Build Status](https://travis-ci.org/konstantinzolotarev/sails-hook-redispubsub.svg)](https://travis-ci.org/konstantinzolotarev/sails-hook-redispubsub)

**This hook is in development and has very limited functionnality please feel free to create issues and new features requests**

Main idea of the hook is to give application written with Sails.js ability to communicate with each other using redis Pub/Sub.

## Send events

### Send global events

Global event will receive all (your) servers that subscribed to given channel.

To send message you could use this method:
```javascript
// Send message to all sails instances/servers/applications
sails.redispubsub.publish({
  event: 'clearCache',
  items: 'test'
});
```

or
```javascript
// Send message to all sails instances/servers/applications
sails.redispubsub.publish('clearCache', {
  items: 'test'
});
```

### Send local events

Local event will be received only by instance that sent event.

Sending local event:
```javascript
sails.redispubsub.emit('event', { /*... something ... */ });
```

**Note that message that you will send will be converted to string using `JSON.stringify` please do not send streams, functions in it !**

## Event handling

### Handling global/local events using subscribers

Subscribe on event into your code:
```javascript
// Note that sails is a global variable
sails.redispubsub.on('event', function(data) {
  // Event handled
  sails.log.debug('event handled', data);
});
```

And send event from another server (all servers including current will receive event):
```javascript
sails.redispubsub.publish('event', {
  something: 'anything'
});
```

Or you could send message only to current instance using `emit` method:
**Only current server will receive this message !**
```javascript
sails.redispubsub.emit('event', {
  something: 'anything'
});
```

Hook is based on default `EventEmitter` class. So you could use any method from it.
[List of methods](https://nodejs.org/api/events.html#events_emitter_removealllisteners_event)

**Note:** `emit()` method will send event **only** to current instance !
To send event to all instances use `publish()` method.

### Handling all global messages (for all global events)

You could handle all messages using `config/redispubsub.js` configuration file and `onMessage(channel, message)` method in it.

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
  /**
   * Redis connection settings
   */
  connection: {

    options: {
      host: 'localhost',
      port: 6370
    }
  },

  /**
   * Channel name of redis pub/sub
   * By default hook use channel name: 'sails'
   *
   * @type {String}
   */
  channel: 'sails-new'

  /**
   * On subscribe handler
   *
   * @type {function}
   */
  onSubscribe: function(channel, count) {
    console.log(channel, count);
  },

  /**
   * Error handler
   *
   * @type {function}
   */
  onError: function(err) {
    console.log(err);
  },

  /**
   * Global message handler
   *
   * @type {function}
   */
  onMessage: function(channel, message) {
    console.log(message);
  }
};

```

## Passing existing pubClient and subClient
You are able to pass existing `pubClient` and `subClient` to this hook.
So hook wouldn't create a new connections.

in `config/redispubsub.js` file:
This hook support redis connection options (full list of options you could find [here](https://github.com/NodeRedis/node_redis#overloading)):

```javascript

module.exports.redispubsub = {
  /**
   * Redis connection settings
   */
  connection: {

    pubClient: pubClient,

    subClient: subClient
  }
  // ...
}
```

In this case you don't need to pass `connection.options`

# License

MIT
