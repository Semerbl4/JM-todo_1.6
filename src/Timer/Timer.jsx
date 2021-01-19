import React from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { minutes } = props;
  const { seconds } = props;
  const { startTimer } = props;
  const { stopTimer } = props;

  // const intervalStartTimer = setInterval(() => {
  //   startTimer()
  // }, 1000);

  return (
    <span className="description">
      <button className="icon icon-play" aria-label="запустить" type="button" onClick={startTimer} />
      <button className="icon icon-pause" aria-label="остановить" type="button" onClick={stopTimer} />
      <span className="timer-time">{`${minutes}:${seconds}`}</span>
    </span>
  );
};

Timer.defaultProps = {
  minutes: '00',
  seconds: '00',
  startTimer: () => {},
  stopTimer: () => {},
};

Timer.propTypes = {
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

export default Timer;
