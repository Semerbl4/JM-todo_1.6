import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  state = {
    value: '',
    minutes: '',
    seconds: '',
  };

  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  setValidStates = (event) => {
    if (event.target.name === 'task') {
      this.setState({ value: event.target.value });
      // console.dir('task', minutes, seconds)
    }

    if (event.target.name === 'minutes' && !Number.isNaN(+event.target.value)) {
      this.setState({ minutes: +event.target.value });
    }

    if (event.target.name === 'seconds' && !Number.isNaN(+event.target.value) && +event.target.value <= 60) {
      this.setState({ seconds: +event.target.value });
    }
  };

  render() {
    const { addTask } = this.props;
    const { value } = this.state;
    const { minutes } = this.state;
    const { seconds } = this.state;
    // console.log(this.state)

    return (
      <header className="header">
        <h1>todos</h1>
        <form
          className="new-todo-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!value) {
              return;
            }
            addTask(value, minutes, seconds);
            this.setState({
              value: '',
              minutes: '',
              seconds: '',
            });
          }}
        >
          <input
            className="new-todo"
            name="task"
            tabIndex={0}
            placeholder="What needs to be done?"
            value={value}
            onChange={this.setValidStates}
          />
          <input
            className="new-todo-form__timer"
            name="minutes"
            value={minutes}
            placeholder="Min"
            onChange={this.setValidStates}
          />
          <input
            className="new-todo-form__timer"
            name="seconds"
            value={seconds}
            placeholder="Sec"
            onChange={this.setValidStates}
          />
          <button type="submit" aria-label="отправить" />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
