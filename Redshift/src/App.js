import React, { Component } from 'react';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
		return  current && !current.isBetween(now, ddl, 'day', '[)');
	}
	render() {
		return (
			<div className="App">
				<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>AntD React Demo</h2>
				</div>
				<p className="App-intro">
					可选范围：今天 ~ 2017.08.31
				</p>
				<div style={{ width: 400, margin: '100px auto' }}>
					<div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
					<DatePicker
						format="YYYY-MM-DD"
						disabledDate={this.disabledDate}
						onChange={value => this.handleChange(value)}
					/>
				</div>
			</div>
		);
}
}

export default App;
