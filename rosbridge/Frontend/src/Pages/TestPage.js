import {RosConnect, Publisher, Subscribe, Unsubscribe, GetTopic} from '../Helpers/RosConnection';
import {useEffect, useState} from 'react';

const TestPage = () => {
	const [ros, setRos] = useState(null);
	const [topic, setTopic] = useState(null);

	useEffect(() => {
		setRos(RosConnect('ws://0.0.0.0:9090'));
	}, []);

	useEffect(() => {
		console.log(ros);
	}, [ros]);

	const subs = () => {
		const top = GetTopic(ros, '/chatter', 'std_msgs/String');
		setTopic(top);
		Subscribe(top);
	}

	const unsub = () => {
		Unsubscribe(topic);
	}

	const publ = () => {
		const top = GetTopic(ros, '/chatter', 'std_msgs/String');
		setTopic(top);
		Publisher(top, 'Test');
	}

	return(
		<div>
			<button onClick={() => subs()}> Subscribe </button>
			<button onClick={() => unsub()}> Unubscribe </button>
			<button onClick={() => publ()}> Publish </button>
		</div>
	);
}

export default TestPage;