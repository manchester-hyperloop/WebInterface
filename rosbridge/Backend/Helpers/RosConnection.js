const ROSLIB =  require('roslib');

exports.RosConnect = (url) => {
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

exports.Publisher = (topic, message) => {
	var mess = new ROSLIB.Message({
		data: JSON.stringify(message)
	});

	try{
		topic.publish(mess);
	}catch(err){
		console.log(err.message)
	}
}

exports.Subscribe = (topic) => {
	try{
		topic.subscribe((message) => {
			console.log(message);
		});
	}catch(err){
		console.log(err.message);
	}
}

exports.Unsubscribe = (topic) => {
	try{
	topic.unsubscribe();
	}catch(err){
		console.log(err.message);
	}
}

exports.GetTopic = (ros, name, messageType) => {
	const topic = new ROSLIB.Topic({
		ros: ros,
		name: name,
		messageType: messageType
	});

	return topic;
} 
