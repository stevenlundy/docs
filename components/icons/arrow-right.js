import PropTypes from 'prop-types'

const ArrowDown = ({ fill, width = 6, height = 10 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
        stroke={fill}
        strokeLinecap="square"
      />
    </svg>
  )
}

ArrowDown.propTypes = {
  // Width and height support both `width={20}` and `width="20px"`
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string
}

export default ArrowDown
