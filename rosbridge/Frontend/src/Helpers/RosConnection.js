import ROSLIB from 'roslib';

const RosConnect = (url) => {
	var ros = null;
	try{
		ros = new ROSLIB.Ros({
			url: url,
		});

		if(ros){
			ros.on('connection', () => {
				console.log('Connected to ROS');
			});
		}

		if(ros){
			ros.on('error', (error) => {
				console.log(error);
			});
		}
	}catch(error){
		console.log(error.message);
	}

	return ros;
}

const Publisher = (topic, message) => {
	var mess = new ROSLIB.Message({
		data: JSON.stringify(message)
	});

	try{
		topic.publish(mess);
	}catch(err){
		console.log(err)
	}
}

const Subscribe = (topic) => {
	console.log(topic)
	topic.subscribe((message) => {
		console.log(message);
	});
}

const Unsubscribe = (topic) => {
	topic.unsubscribe();
}

const GetTopic = (ros, name, messageType) => {
	const topic = new ROSLIB.Topic({
		ros: ros,
		name: name,
		messageType: messageType
	});

	return topic;
} 

export {RosConnect, Publisher, Subscribe, Unsubscribe, GetTopic};