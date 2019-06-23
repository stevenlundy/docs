import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { LinkWithHoverPrefetch } from '~/components/text/link'
import qs from 'querystring'
import { parse } from 'url'
import _scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import ArrowDown from '~/components/icons/arrow-down'
import Link from 'next/link'

function scrollIntoViewIfNeeded(elem, centerIfNeeded, options, config) {
  const finalElement = findClosestScrollableElement(elem)
  return _scrollIntoViewIfNeeded(
    elem,
    centerIfNeeded,
    options,
    finalElement,
    config
  )
}

function findClosestScrollableElement(_elem) {
  const { parentNode } = _elem
  if (!parentNode) return null

  if (
    parentNode.scrollHeight > parentNode.clientHeight ||
    parentNode.scrollWidth > parentNode.clientWidth
  ) {
    return parentNode
  } else {
    return findClosestScrollableElement(parentNode)
  }
}

function Category({ info, level = 1, ...props }) {
  const levelClass = `level-${level}`
  const [toggle, setToggle] = useState(false)

  const categorySelected =
    props.url.pathname === '/docs' || props.url.pathname === '/docs/v2'
      ? info.name === 'Getting Started'
        ? true
        : false
      : JSON.stringify(info.posts).includes(
          props.url.pathname.replace(/\/$/, '')
        )

  useEffect(() => {
    if (categorySelected) {
      setToggle(true)
    }
  }, [categorySelected])

  const onClick = () => {
    setToggle(!toggle)
  }

  return (
    <div
      className={`category ${levelClass} ${toggle ? 'open' : ''} ${
        categorySelected ? 'selected' : ''
      }`}
      key={info.name || ''}
    >
      <a className="label" onClick={onClick}>
        <ArrowDown width={9} fill="#000" />
        {info.name}
      </a>
      {!info.href || isCategorySelected(info) ? (
        <div className="posts">
          {info.posts.map(postInfo => (
            <Post
              info={postInfo}
              level={level + 1}
              categorySelected={categorySelected}
              key={postInfo.name}
              {...props}
            />
          ))}
        </div>
      ) : null}
      <style jsx>{`
        .label {
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: #666;
        }

        .label :global(svg) {
          margin-right: 12px;
          transform: rotate(-90deg);
          transition: all 0.15s ease;
        }

        .selected > .label {
          font-weight: 600;
          color: #000;
        }

        .open > .label {
          color: #000;
        }

        .open > .label :global(svg) {
          transform: rotate(0deg);
        }

        .level-2 .label {
          font-size: 14px;
          text-transform: none;
          letter-spacing: 0;
          cursor: default;
        }

        .label:hover {
          color: #000;
        }

        .category {
          margin: 18px 0;
        }

        .category:last-child {
          margin-bottom: 0;
        }

        .posts {
          border-left: 1px solid #eaeaea;
          margin-left: 3.5px;
          margin-top: 0;
          height: 0;
          overflow: hidden;
          padding-left: 21px;
        }

        .open > .posts {
          margin-top: 18px;
          height: auto;
        }

        @media screen and (max-width: 950px) {
          .label {
            margin: 0;
          }

          .label:not(.link) {
            padding-left: 0;
          }

          .level-2 .label {
            margin: 0;
            border-bottom: 1px solid #eee;
          }

          .level-2 .label:not(.link) {
            padding: 20px 0;
          }
        }
      `}</style>
    </div>
  )
}

function Post({ info, level = 1, ...props }) {
  if (info.posts) {
    return <Category info={info} level={level} {...props} />
  }

  return (
    <div className="link" key={info.href}>
      <NavLink
        info={info}
        url={props.url}
        hash={props.hash}
        scrollSelectedIntoView={props.scrollSelectedIntoView}
        categorySelected={props.categorySelected}
        level={level}
      />
      <style jsx>{`
        .link {
          margin: 18px 0;
        }

        .link:first-child {
          margin-top: 0;
        }

        .link:last-child {
          margin-bottom: 0;
        }

        @media screen and (max-width: 950px) {
          .link {
            margin: 0;
            border-bottom: 1px solid #eee;
          }
        }
      `}</style>
    </div>
  )
}

export class NavLink extends React.Component {
  constructor(props) {
    super(props)
    this.node = null
    this.state = { selected: this.isSelected() }
  }

  componentDidMount() {
    this.scrollIntoViewIfNeeded()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selected !== nextState.selected
  }

  componentDidUpdate() {
    this.scrollIntoViewIfNeeded()
  }

  getCurrentHref(props = this.props) {
    const { url, hash } = props
    const cleanedQuery = { ...url.query }
    delete cleanedQuery.amp
    const query = qs.stringify(cleanedQuery)
    return `${url.pathname}${query ? '?' + query : ''}${hash || ''}`
  }

  isSelected(props = this.props) {
    const { href, aliases = [], posts } = props.info
    const currentHref = this.getCurrentHref(props)

    if (href === currentHref) return true
    if (href === props.url.pathname) return true
    if (href.includes('#')) {
      if (posts && posts.length && currentHref === href) return true
      if (
        posts &&
        posts.length &&
        props.level > 2 &&
        (currentHref === href || currentHref.startsWith(href))
      )
        return true
      if ((!posts || !posts.length) && currentHref.startsWith(href)) return true
    }
    if (aliases.indexOf(currentHref) >= 0) return true

    return false
  }

  onlyHashChange() {
    const { pathname } = parse(this.props.info.href)
    return pathname === this.props.url.pathname
  }

  scrollIntoViewIfNeeded() {
    if (
      this.props.scrollSelectedIntoView &&
      this.state.selected &&
      this.props.categorySelected
    ) {
      if (this.node.scrollIntoViewIfNeeded) {
        this.node.scrollIntoViewIfNeeded()
      } else {
        scrollIntoViewIfNeeded(this.node)
      }
    }
  }

  render() {
    const { info, level } = this.props
    const { selected } = this.state

    return (
      <div
        ref={ref => (this.node = ref)}
        className={cn('nav-link', { selected })}
      >
        {// NOTE: use just anchor element for triggering `hashchange` event
        this.onlyHashChange() ? (
          <a className={selected ? 'selected' : ''} href={info.as || info.href}>
            {info.name}
          </a>
        ) : (
          <LinkWithHoverPrefetch href={info.href} as={info.as || info.href}>
            {info.name}
          </LinkWithHoverPrefetch>
        )}
        <style jsx>{`
          div.selected {
            box-sizing: border-box;
          }

          .nav-link :global(a) {
            text-decoration: none;
            font-size: 14px;
            color: #666;
            box-sizing: border-box;
          }

          .selected :global(a) {
            font-weight: 600;
            color: #0076ff;
          }

          .nav-link:hover :global(a) {
            color: #000;
          }

          span {
            color: #979797;
          }

          @media screen and (max-width: 950px) {
            div {
              padding-top: 0;
              padding-left: 0;
              padding-bottom: 0;
            }

            div.selected {
              border-left: none;
              padding-left: 0;
            }

            .nav-link :global(a) {
              display: block;
              padding: 20px 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default function DocsNavbarDesktop({ categoryInfo, ...props }) {
  return (
    <>
      {props.data.map(categoryInfo => (
        <Category info={categoryInfo} {...props} key={categoryInfo.name} />
      ))}
    </>
  )
}
