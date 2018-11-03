const mongoose = require('mongoose');

module.exports = () => {
	const connect = () => {
		if(process.env.NODE_ENV !== 'production') {
			mongoose.set('debug', true);
		}
		mongoose.connect(`mongodb://koo:${process.env.PWD}@localhost:27017/admin`, {
			dbName: 'nodejs',
		}, error => {
			if(error) {
				console.log('connection error');
			} else {
				console.log('connection success');
			}
		});
	};
  
	connect();
	mongoose.connection.on('error', error => {
		console.log('connection error', error);
	});

	mongoose.connection.on('disconnected', error => {
		console.log('disconnected, retry', error);
		connect();
	});
  
	require('./user');
	require('./comment');
};  