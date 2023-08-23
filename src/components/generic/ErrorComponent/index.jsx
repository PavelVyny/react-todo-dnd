import PropTypes from 'prop-types';

function ErrorComponent({ errorMessage }) {
  return (
    <div>
      <h2>Something goes wrong</h2>
      <p>{errorMessage}</p>
    </div>
  );
}

ErrorComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorComponent;
