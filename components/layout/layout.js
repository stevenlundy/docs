import React from 'react'
import { useAmp } from 'next/amp'
import Page from '~/components/layout/page'
import Header from '~/components/layout/header'
import { UserContext } from '~/lib/user-context'
import UseTeamInfo from '~/lib/use-team-info'
import * as bodyLocker from '~/lib/utils/body-locker'

const WrapForAmp = ({ comp, ...props }) => {
  const isAmp = useAmp()
  return React.createElement(comp, { ...props, isAmp })
}

export default class Layout extends React.Component {
  state = {
    navigationActive: false
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
                />
              )}
            />
          )}
        </UserContext.Consumer>
        {children}
      </Page>
    )
  }
}
