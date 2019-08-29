import PropTypes from 'prop-types'

const Copy = ({ height, width, stroke, fill, label }) => {
  return (
    <svg
      width={width || '13px'}
      height={height || '15px'}
      viewBox="0 0 13 15"
      aria-label={label || 'copy'}
    >
      <g
        fill={fill || 'var(--geist-background)'}
        stroke={stroke || 'var(--geist-foreground)'}
        fillRule="nonzero"
        strokeWidth={1}
      >
        <rect x="0.5" y="0.5" width={9} height={11} rx="1.5" />
        <rect x="3.5" y="3.5" width={9} height={11} rx="1.5" />
      </g>
    </svg>
  )
}

Copy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string
}

export default Copy
