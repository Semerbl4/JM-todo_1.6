import React from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';

import './Footer.css';

const Footer = (props) => {
  const { changeFilter } = props;
  const { clearCompleted } = props;
  const { uncompletedTasks } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{uncompletedTasks()} items left</span>
      <TaskFilter changeFilter={changeFilter} />
      <button className="clear-completed" onClick={clearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  changeFilter: () => {},
  clearCompleted: () => {},
  uncompletedTasks: () => {},
};

Footer.propTypes = {
  changeFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
  uncompletedTasks: PropTypes.func,
};

export default Footer;
