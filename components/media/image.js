import React, { Component } from 'react'
import { useAmp } from 'next/amp'
import PropTypes from 'prop-types'
import IObserver from '~/components/intersection-observer'
import cn from 'classnames'

import VideoComponent from './video'

// This component might look a little complex
// because one could argue that keeping the aspect ratio
// of an image can be solved with `height: auto`,
// but it's actually not that easy if you want to prevent
// element flickering

// Because if you want to do that, you need to set the aspect
// ratio of the image's container BEFORE the image loads

const AmpImg = ({ children, src, srcSet, height, width, alt }) => {
  const isAmp = useAmp()

  if (isAmp)
    return (
      <amp-img layout="responsive" {...{ src, srcSet, height, width, alt }} />
    )
  return children
}

class Image extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    lazy: true
  }

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  state = {
    src: !this.props.lazy ? this.props.videoSrc || this.props.src : undefined
  }

  handleIntersect = entry => {
    if (entry.isIntersecting) {
      this.setState({ src: this.props.src })
    }
  }

  render() {
    const {
      caption,
      height,
      lazy,
      margin = 40,
      video = false,
      videoSrc,
      width,
      captionSpacing = null,
      oversize = false,
      borderRadius = false,
      children,
      shadow
    } = this.props

    const aspectRatio = String((height / width) * 100) + '%'
    const classes = width > 768 && oversize ? 'oversize' : ''

    if (video || videoSrc) {
      return <VideoComponent src={videoSrc} {...this.props} />
    }

    return (
      <AmpImg {...this.props}>
        <IObserver
          once
          onIntersect={this.handleIntersect}
          rootMargin="20%"
          disabled={!lazy}
        >
          <figure className={cn(classes, { 'has-shadow': shadow })}>
            <main style={{ width }}>
              <div className="container" style={{ paddingBottom: aspectRatio }}>
                {this.state.src ? (
                  <img src={this.state.src || null} />
                ) : (
                  children
                )}
              </div>

              {caption && (
                <p style={captionSpacing ? { marginTop: captionSpacing } : {}}>
                  {caption}
                </p>
              )}
            </main>

            <style jsx>{`
              figure {
                display: block;
                text-align: center;
              }

              main {
                margin: 0 auto;
                max-width: 100%;
              }

              div {
                position: relative;
              }

              img {
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
              }

              .container {
                display: flex;
                justify-content: center;
              }

              p {
                color: #999;
                font-size: 12px;
                margin: 0;
                text-align: center;
              }

              .has-shadow + :global(.caption) {
                margin: 0 0 40px;
              }
            `}</style>
            <style jsx>{`
              figure {
                margin: ${margin}px 0;
              }

              img {
                ${borderRadius || shadow ? `border-radius: 5px;` : ''};
                ${shadow ? `box-shadow: var(--shadow-large)` : ''};
              }

              @media (min-width: 992px) {
                figure.oversize {
                  width: ${width}px;
                  margin: ${margin}px 0 ${margin}px
                    calc(((${width}px - 768px) / 2) * -1);
                }
              }
            `}</style>
          </figure>
        </IObserver>
      </AmpImg>
    )
  }
}

export const Video = props => <Image {...props} video />

export default Image
