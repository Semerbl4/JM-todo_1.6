import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

class TaskFilter extends React.Component {
  state = {
    activeButton: 'All',
  };

  static defaultProps = {
    changeFilter: () => {},
  };

  static propTypes = {
    changeFilter: PropTypes.func,
  };

  render() {
    const { changeFilter } = this.props;
    const { activeButton } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <ul
        className="filters"
        onClick={(event) => {
          changeFilter(event.target.textContent);
          this.setState({
            activeButton: event.target.textContent,
          });
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            changeFilter(event.target.textContent);
            this.setState({
              activeButton: event.target.textContent,
            });
          }
        }}
      >
        <li>
          <button className={activeButton === 'All' ? 'selected' : null} type="button">
            All
          </button>
        </li>
        <li>
          <button className={activeButton === 'Active' ? 'selected' : null} type="button">
            Active
          </button>
        </li>
        <li>
          <button className={activeButton === 'Completed' ? 'selected' : null} type="button">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default TaskFilter;
