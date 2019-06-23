import React from 'react'
import { useAmp } from 'next/amp'
import Page from '~/components/layout/page'
import Header from '~/components/layout/header'
import { UserContext } from '~/lib/user-context'
import { ZenContext } from '~/lib/zen-context'
import UseTeamInfo from '~/lib/use-team-info'
import * as bodyLocker from '~/lib/utils/body-locker'

const WrapForAmp = ({ comp, ...props }) => {
  const isAmp = useAmp()
  return React.createElement(comp, { ...props, isAmp })
}

export default class Layout extends React.Component {
  static contextType = ZenContext

  state = {
    navigationActive: false,
    zenModeActive: false
  }

  altKeyDown = false

  exitZenMode = () => {
    this.setState(state => ({
      zenModeActive: false
    }))
  }

  onKeyDown(event) {
    // Make Zen mode run only for Screen sizes greater than 960px
    if (window.innerWidth < 960) {
      return
    }
    switch (event.keyCode) {
      case 90:
        // Enter Zen Mode
        if (this.altKeyDown) {
          this.setState({
            zenModeActive: !this.state.zenModeActive
          })
        }
        break

      case 27:
        // Exit Zen Mode
        this.setState({
          zenModeActive: false
        })

        break

      case 18: // alt-key
        this.altKeyDown = true
        break
    }
  }

  onKeyUp(event) {
    if (event.which === 18) {
      this.altKeyDown = false
    }
    this.altKeyDown = false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this), false)
    document.addEventListener('keyUp', this.onKeyUp.bind(this), false)
  }

  handleToggleNavigation = () => {
    this.setState(({ navigationActive }) => {
      if (navigationActive) {
        bodyLocker.unlock()
      } else {
        bodyLocker.lock()
      }

      return {
        navigationActive: !navigationActive
      }
    })
  }

  handleIndexClick = () => {
    if (this.state.navigationActive) {
      bodyLocker.unlock()
      this.setState({
        navigationActive: false
      })
    }
  }

  render() {
    const { children } = this.props

    return (
      <Page>
        <UserContext.Consumer>
          {({ user, userLoaded }) => (
            <UseTeamInfo
              user={user}
              render={({ teams }) => (
                <WrapForAmp
                  comp={Header}
                  onToggleNavigation={this.handleToggleNavigation}
                  user={user}
                  teams={teams}
                  userLoaded={userLoaded}
                  navigationActive={this.state.navigationActive}
                  handleIndexClick={this.handleIndexClick}
                  zenModeActive={this.state.zenModeActive}
                  exitZenMode={this.exitZenMode}
                />
              )}
            />
          )}
        </UserContext.Consumer>
        <ZenContext.Provider value={this.state.zenModeActive}>
          {children}
        </ZenContext.Provider>
      </Page>
    )
  }
}
