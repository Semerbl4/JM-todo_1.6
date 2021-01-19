import React from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';

import Timer from '../Timer/Timer';

class Task extends React.Component {
  state = {
    intervalId: 0,
    timerIsActive: false,
  };

  static defaultProps = {
    completed: false,
    taskText: '',
    minutes: '',
    seconds: '',
    taskCreateTime: new Date(),
    id: Math.random(),
    completeChanged: () => {},
    taskDestroyed: () => {},
    className: '',
  };

  static propTypes = {
    completed: PropTypes.bool,
    taskText: PropTypes.string,
    minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    taskCreateTime: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    completeChanged: PropTypes.func,
    taskDestroyed: PropTypes.func,
    className: PropTypes.string,
  };

  componentDidMount() {
    const { minutes } = this.props;
    const { seconds } = this.props;

    this.setState({
      timerMinutes: minutes,
      timerSeconds: seconds,
    });
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    const { timerIsActive } = this.state;

    if (!timerIsActive) {
      this.setState((state) => ({
        intervalId: setInterval(() => {
          let { timerMinutes } = this.state;
          let { timerSeconds } = this.state;

          if (timerMinutes) {
            timerSeconds -= 1;
            this.setState({ timerSeconds });
            if (timerSeconds === 0) {
              timerMinutes -= 1;
              timerSeconds = 60;
              this.setState({ timerMinutes, timerSeconds });
              // eslint-disable-next-line react/no-access-state-in-setstate
            }
          } else if (!timerMinutes && timerSeconds !== 0) {
            timerSeconds -= 1;
            this.setState({ timerSeconds });
          } else {
            // console.log('чистим')

            this.stopTimer();
          }
          // console.log('tick')
        }, 1000),
        timerIsActive: !state.timerIsActive,
      }));
    }
  };

  stopTimer = () => {
    const { intervalId } = this.state;

    clearInterval(intervalId);

    this.setState((state) => ({
      timerIsActive: !state.timerIsActive,
    }));
  };

  completeToogler = () => {
    const { completeChanged } = this.props;
    const { id } = this.props;

    completeChanged(id);
  };

  currentTaskDestroyed = () => {
    const { id } = this.props;
    const { taskDestroyed } = this.props;

    taskDestroyed(id);
  };

  render() {
    const { completed } = this.props;
    const { taskText } = this.props;
    const { minutes } = this.props;
    const { seconds } = this.props;
    const { taskCreateTime } = this.props;
    const { className } = this.props;

    const { timerMinutes } = this.state;
    const { timerSeconds } = this.state;

    // console.log(completed);
    // console.log(this.props);
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.completeToogler} defaultChecked={completed} />
          <label>
            <span className="title">{taskText}</span>
            {minutes || seconds ? (
              <Timer
                minutes={timerMinutes}
                seconds={timerSeconds}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
              />
            ) : null}
            <span className="created">created {formatDistanceToNow(taskCreateTime, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Редактировать" />
          <button
            className="icon icon-destroy"
            onClick={this.currentTaskDestroyed}
            type="button"
            aria-label="Удалить"
          />
        </div>
        {className === 'editing' ? <input type="text" className="edit" defaultValue="Editing task" /> : null}
      </li>
    );
  }
}

export default Task;
