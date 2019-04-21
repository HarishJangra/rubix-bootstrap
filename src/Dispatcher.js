import PubSub from 'pubsub-js';

const Dispatcher = {
  subscribe: function(event, callback) {
    var token = PubSub.subscribe(event, (msg, data) => {
      callback.apply(this, data);
    });

    return token;
  },
  unsubscribe: PubSub.unsubscribe,
  publish: function(event, ...args) {
    PubSub.publish(event, args);
  }
};

export default Dispatcher;
