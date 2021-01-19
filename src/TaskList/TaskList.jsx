import React from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import './TaskList.css';

import Task from '../Task/Task';

const TaskList = ({ todoData, completeChanged, taskDestroyed, currentFilter }) => {
  const tasksFiltered = () => {
    let arrTaskList;

    if (currentFilter === 'Active') {
      arrTaskList = todoData.filter((el) => el.completed === false);
    }

    if (currentFilter === 'Completed') {
      arrTaskList = todoData.filter((el) => el.completed === true);
    } else if (currentFilter === 'All') {
      arrTaskList = todoData.slice();
    }

    arrTaskList = arrTaskList.map((element) => (
      <Task {...element} key={element.id} completeChanged={completeChanged} taskDestroyed={taskDestroyed} />
    ));

    // console.log(currentFilter, arrTaskList, todoData);
    return arrTaskList;
  };

  return <ul className="todo-list">{tasksFiltered()}</ul>;
};

TaskList.defaultProps = {
  todoData: [{}],
  completeChanged: () => {},
  taskDestroyed: () => {},
  currentFilter: 'All',
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  completeChanged: PropTypes.func,
  taskDestroyed: PropTypes.func,
  currentFilter: PropTypes.string,
};

export default TaskList;
