import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
		};
	}
	handleChange(date) {
		message.info('您选择的日期是: ' + date.toString());
		this.setState({ date });
	}
	disabledDate(current) {
		const ddl = new Date(2017, 8, 1);
		const now = new Date();
		const test = new Date(2017, 3, 25);
//		console.log(current);
//		console.log(Date.now());
//		console.log(ddl);
//		console.log(current.valueOf() < Date.now());
//		console.log(current.valueOf() > ddl);
//		return  current && (current.valueOf() > ddl || current.valueOf() < Date.now() );
//		if(current){
////			console.log(current.isBetween(now, ddl, 'day', '[)'));
//			return  current && !current.isBetween(now, ddl, 'day', '[)');
//		} else return false;
		
		return  current && !current.isBetween(now, ddl, 'day', '[)');
				
//		if(current){
////			console.log(current.valueOf());
//			return  (current.valueOf() > ddl || current.valueOf() < Date.now() );
//		} else return false;
	}
	render() {
		return (
			<div style={{ width: 400, margin: '100px auto' }}>
				<div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
				<DatePicker
					format="YYYY-MM-DD"
					disabledDate={this.disabledDate}
					onChange={value => this.handleChange(value)}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));