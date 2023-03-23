/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { peek } from '@laufire/utils/debug';
import { React, useState } from 'react';
import './App.scss';

const App = (context) => {
	const { config: { permissions, requestPermissions }} = context;
	const [state, setState] = useState({});

	const pipe = (data) => {
		peek(data);
		setState(() => data.data);

		return alert(data.status);
	};

	return <div className="App">

		<button onClick={ async () => {
			const res = await navigator.contacts.select(['name', 'email'], { multiple: true });

			peek(res);
			return alert(res);
		} }
		> Contact</button>
	</div>;
};

export default App;
