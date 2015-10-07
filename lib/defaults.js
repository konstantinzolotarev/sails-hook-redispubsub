'use strict';

module.exports = {

	redispubsub : {

    /**
     * Redis connection configuration
     */
		connection: {
      /**
       * Default redis options that are available for [node_redis]
       *
       * @link https://github.com/NodeRedis/node_redis
       * @type {Object}
       */
      options: {}
    },

    /**
     * Chanel name that pub/sub will use for messaging
     *
     * @type {string}
     */
    channel: 'sails',

    onSubscribe: function (channel, count) {},

    onMessage: function (channel, message) {},

    onError: function(channel, error) {}
	}
};
