import React from 'react'
import PropTypes from 'prop-types'
import ArrowDouble from '~/components/icons/arrow-double'
import cn from 'classnames'

const Select = (
  {
    children,
    width,
    minWidth,
    maxWidth,
    disabled,
    className,
    onChange,
    hasArrow = true,
    value,
    small,
    defaultValue,
    ...props
  },
  { darkBg }
) => {
  return (
    <div className={cn('select', { disabled }, className)} {...props}>
      <select
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        id={props.id}
      >
        {children}
      </select>

      {hasArrow && (
        <div className="arrow">
          <ArrowDouble />
        </div>
      )}

      <style jsx>{`
        .select {
          appearance: none;
          color: ${darkBg ? '#fff' : '#000'};
          background: ${darkBg ? '#000' : '#fff'};
          display: inline-flex;
          height: ${small ? '24px' : '40px'};
          outline: none;
          border: 1px solid ${darkBg ? '#666' : '#eaeaea'};
          font-size: 12px;
          text-transform: uppercase;
          user-select: none;
          font-weight: 100;
          position: relative;
          overflow: hidden;
          transition: border 0.2s, background 0.2s, color 0.2s ease-out,
            box-shadow 0.2s ease;
          border-radius: 4px;
          white-space: nowrap;
          line-height: 0;
          width: ${width || 'auto'};
          min-width: ${minWidth ? minWidth : small ? '105px' : '160px'};
          max-width: ${maxWidth ? maxWidth : 'auto'};
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
          color: ${darkBg ? '#fff' : '#000'};
          line-height: ${small ? '22px' : '40px'};
          font-size: ${small ? '12px' : '14px'};
          margin-right: -20px;
          width: calc(100% + 20px);
          padding: ${small
            ? '0 20px 0 10px'
            : hasArrow
            ? '0 76px 0 16px'
            : '0 36px 0 16px'};
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
          border-left: ${small
            ? 'none'
            : darkBg
            ? '1px solid #666'
            : '1px solid #eaeaea'};
          background: ${darkBg ? '#000' : '#fff'};
          width: ${small ? '25px' : '30px'};
          height: 100%;
          position: absolute;
          right: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border 0.2s;
        }

        .select .arrow :global(svg) {
          stroke: #999;
          transition: stroke 0.2s ease;
          stroke-width: 0.1px;
        }

        .select:hover,
        .select:focus-within {
          border-color: #ddd;
        }

        .select:hover .arrow,
        .select:focus-within .arrow {
          border-color: #ddd;
        }

        .select:hover .arrow :global(svg),
        .select:focus-within .arrow :global(svg) {
          stroke: ${darkBg ? '#fff' : '#000'};
        }

        .select.disabled,
        .select.disabled .arrow {
          background: ${darkBg ? '#000' : '#fafafa'};
        }

        .select.disabled:hover {
          box-shadow: none;
          border-color: #eaeaea;
        }

        .select.disabled select {
          color: #999;
          cursor: not-allowed;
        }

        .select.disabled:hover .arrow {
          border-color: #eaeaea;
        }

        .select.disabled:hover .arrow :global(svg) {
          stroke: #999;
        }

        @media screen and (max-width: 640px) {
          select {
            font-size: 16px;
          }
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

Select.contextTypes = {
  darkBg: PropTypes.bool
}

export default Select
