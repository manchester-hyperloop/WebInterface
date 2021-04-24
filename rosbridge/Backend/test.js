const {RosConnect, Subscribe, Unsubscribe, GetTopic, Publisher} = require('./Helpers/RosConnection');

const unsub = () => {
  Unsubscribe(topic);
  console.log("Unsubscribed");
}

const ros = RosConnect('ws://0.0.0.0:9090');


topic = GetTopic(ros, '/chatter', 'std_msgs/String');
Subscribe(topic);
setTimeout(() => unsub(), 5000);
//setInterval(() => Publisher(topic, 'Test'), 1000);