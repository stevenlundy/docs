import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '~/components/avatar'
import * as PopOver from '~/components/popover'
import PopOverLink from '~/components/popover/popover-link'
import PlusIcon from '~/components/icons/plus'

export default class AvatarPopOverLink extends React.Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const section = this.props.pathname
      .split('/')
      .slice(0, 2)
      .join('/')
    const { user, sticky } = this.props

    if (!user) return null

    const top = this.props.top || 43
    const avatarSize = this.props.avatarSize || 30

    return (
      <span className="avatar">
        <PopOverLink
          noIcon
          hideOnClick
          fixed={sticky}
          offsetTop={17}
          offsetLeft={-168}
          top={sticky ? '20px' : top}
          inline={false}
          ref={ref => (this.popover = ref)}
          to={
            <div className="avatar-menu">
              <PopOver.Menu tipOffset={173}>
                <PopOver.Item
                  key="0"
                  active={this.props.pathname === '/dashboard'}
                >
                  <a href="/dashboard">Dashboard</a>
                </PopOver.Item>
                <PopOver.Item
                  className
                  key="1"
                  active={this.props.pathname === '/teams/settings'}
                  icon={<PlusIcon />}
                >
                  <a href="/teams/create">New Team</a>
                </PopOver.Item>
                <PopOver.Item key="2">
                  <a href="/account">Settings</a>
                </PopOver.Item>
                <PopOver.Item key="4">
                  <a
                    className={`logout ${
                      this.state.loggingOut ? 'disabled' : ''
                    }`}
                    onClick={() => {
                      this.setState({ loggingOut: true })
                      this.props.onLogout && this.props.onLogout()
                    }}
                  >
                    {this.state.loggingOut ? 'Logging out...' : 'Logout'}
                  </a>
                </PopOver.Item>
              </PopOver.Menu>
            </div>
          }
        >
          <a
            href="/account"
            onClick={e => {
              if (!e.metaKey) e.preventDefault()
            }}
            className={
              'avatar-link ' + ('/account' === section ? 'active' : '')
            }
          >
            <Avatar
              uid={this.props.user.uid}
              title={this.props.user.username || this.props.user.email}
              size={avatarSize}
              hash={this.props.user.avatar}
            />
          </a>
        </PopOverLink>
        <style jsx>{`
          .avatar-menu :global(.item > a.active),
          .avatar-menu :global(.item > a:hover) {
            background: var(--accents-1);
          }
          .avatar-menu :global(.item) {
            width: 200px;
          }

          .avatar-menu :global(.item:first-child) {
            padding-top: 8px;
            padding-bottom: 16px;
          }

          .avatar-menu :global(.item:first-child > a) {
            padding-top: 8px;
          }

          .avatar-menu :global(.item:not(:first-child)) {
            border-top: 1px solid var(--accents-2);
            padding-top: 16px;
            padding-bottom: 16px;
          }

          .avatar-menu :global(.item:nth-child(3)) {
            border: none;
            padding-top: 0;
          }
          .avatar-menu :global(.item:nth-child(3) .icon) {
            height: 35px;
          }

          .avatar-menu :global(.item:last-child > a) {
            padding-bottom: 8px;
          }

          .avatar-menu :global(.menu) {
            padding-bottom: 0;
          }

          .logout,
          .dark-mode {
            cursor: pointer;
          }
          span.settings {
            font-size: 12px;
          }

          .dark-mode:hover :global(.badge) {
            color: #000;
            transition: 0.2s ease;
          }

          .dark-switch {
            margin-right: 5px;
          }

          .username-wrapper {
            white-space: nowrap;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .disabled {
            opacity: 0.5;
            pointer-events: none;
          }
        `}</style>
      </span>
    )
  }
}
