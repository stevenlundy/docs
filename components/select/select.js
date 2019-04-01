import React from 'react'
import PropTypes from 'prop-types'
import ArrowDown from '~/components/icons/arrow-down.js'
import cn from 'classnames'

const Select = ({
  children,
  width,
  disabled,
  className,
  onChange,
  on,
  hasArrow = true,
  defaultValue,
  ...props
}) => {
  return (
    <div className={cn('select', { disabled }, className)} {...props}>
      <select
        on={on}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        {children}
      </select>

      {hasArrow && (
        <div className="arrow">
          <ArrowDown />
        </div>
      )}

      <style jsx>{`
        .select {
          appearance: none;
          color: #fff;
          background: white;
          display: inline-flex;
          height: 40px;
          outline: none;
          border: 1px solid #eaeaea;
          font-size: 12px;
          text-transform: uppercase;
          user-select: none;
          font-weight: 100;
          position: relative;
          overflow: hidden;
          transition: border 0.2s, background 0.2s, color 0.2s ease-out,
            box-shadow 0.2s ease;
          border-radius: 5px;
          white-space: nowrap;
          line-height: 0;
          width: ${width || 'auto'};
          min-width: 160px;
        }

        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 100%;
          border: none;
          box-shadow: none;
          background: transparent;
          background-image: none;
          line-height: 40px;
          font-size: 14px;
          margin-right: -20px;
          padding: ${hasArrow ? '0 76px 0 16px' : '0 36px 0 16px'};
          width: calc(100% + 20px);
          text-transform: none;
        }
        select:-moz-focusring {
          color: transparent;
          text-shadow: 0 0 0 #000;
        }

        select:focus {
          outline: none;
        }

        .select .arrow {
          border-left: 1px solid #eaeaea;
          background: white;
          width: 40px;
          height: 100%;
          position: absolute;
          right: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .select .arrow :global(svg) {
          stroke: #999;
          transition: stroke 0.2s ease;
        }

        .select:hover,
        .select:focus-within {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          border-color: #ddd;
        }

        .select:hover .arrow,
        .select:focus-within .arrow {
          border-color: #ddd;
        }

        .select:hover .arrow :global(svg),
        .select:focus-within .arrow :global(svg) {
          stroke: #000;
        }

        .select.disabled,
        .select.disabled .arrow {
          background: #fafafa;
        }

        .select.disabled:hover {
          box-shadow: none;
          border-color: #eaeaea;
        }

        .select.disabled select {
          color: #999;
        }

        .select.disabled:hover .arrow {
          border-color: #eaeaea;
        }

        .select.disabled:hover .arrow :global(svg) {
          stroke: #999;
        }
      `}</style>
    </div>
  )
}

Select.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  hasArrow: PropTypes.bool
}

export default Select
