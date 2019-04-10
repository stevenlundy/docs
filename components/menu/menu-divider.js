import cn from 'classnames'
import PropTypes from 'prop-types'

const MenuDivider = (props, { darkBg = false }) => (
  <div className={cn('line', { dark: darkBg })}>
    <style jsx>{`
      .line {
        border-top: 1px solid #eaeaea;
        margin: 8px 0;
        width: 100%;
      }

      .dark.line {
        border-top-color: #333;
      }
    `}</style>
  </div>
)

MenuDivider.contextTypes = {
  darkBg: PropTypes.bool
}

export default MenuDivider
