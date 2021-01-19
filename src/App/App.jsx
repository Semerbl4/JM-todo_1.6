import React from 'react';

import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

class App extends React.Component {
  state = {
    serverInfo: [],
    currentFilter: 'All',
  };

  uncompletedTasks = () => {
    const { serverInfo } = this.state;

    let tasksRemain = 0;

    serverInfo.forEach((el) => {
      if (el.completed === false) {
        tasksRemain += 1;
      }
    });
    return tasksRemain;
  };

  clearCompleted = () => {
    const { serverInfo } = this.state;

    const newServerInfo = serverInfo.filter((el) => el.completed === false);

    this.setState({ serverInfo: newServerInfo });
  };

  changeFilter = (filterName) => {
    // console.log(filterName);

    this.setState({ currentFilter: filterName });
    // console.log(this.state);
  };

  addTask = (taskText, min, sec) => {
    const { serverInfo } = this.state;

    const newServerInfo = [...serverInfo];

    newServerInfo.push({
      id: Math.random(),
      completed: false,
      taskText,
      taskCreateTime: new Date(),
      minutes: min,
      seconds: sec,
    });

    this.setState({ serverInfo: newServerInfo });
  };

  completeChanged = (id) => {
    let { serverInfo } = this.state;
    serverInfo = [...serverInfo];

    const newServerInfo = serverInfo.map((el) => {
      const element = el;
      if (el.id === id) {
        element.completed = !element.completed;
      }
      return element;
    });
    // console.log("меняем на completed");
    // console.log(newServerInfo);

    this.setState({ serverInfo: newServerInfo });
  };

  taskDestroyed = (id) => {
    let { serverInfo } = this.state;
    serverInfo = [...serverInfo];

    const newServerInfo = serverInfo.filter((el) => el.id !== id);

    this.setState({ serverInfo: newServerInfo });
  };

  render() {
    const { serverInfo } = this.state;
    const { currentFilter } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todoData={serverInfo}
          completeChanged={this.completeChanged}
          taskDestroyed={this.taskDestroyed}
          currentFilter={currentFilter}
        />
        <Footer
          changeFilter={this.changeFilter}
          clearCompleted={this.clearCompleted}
          uncompletedTasks={this.uncompletedTasks}
        />
      </section>
    );
  }
}

export default App;
