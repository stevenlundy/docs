import { Component } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import AutoSuggest from 'react-autosuggest'
import {
  Highlight,
  connectAutoComplete,
  Snippet
} from 'react-instantsearch-dom'
import SearchIcon from '~/components/icons/search'

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onSuggestionCleared: PropTypes.func.isRequired
  }

  state = {
    value: '',
    inputFocused: false
  }

  componentDidMount() {
    if (this.props.router.query.query) {
      this.setState({
        value: decodeURIComponent(this.props.router.query.query) || ''
      })
    }
  }

  onChange = (_, { newValue }) => {
    if (!newValue) {
      this.props.onSuggestionCleared()
    }

    this.setState({ value: newValue })
  }

  onToggleFocus = () => {
    this.setState({ inputFocused: !this.state.inputFocused })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  onSuggestionSelected = (_, { suggestion, method }) => {
    this.props.onSuggestionSelected(_, { suggestion })

    if (method === 'enter') {
      this.props.router.push({
        pathname: suggestion.url,
        query: { query: encodeURIComponent(this.state.value) },
        hash: suggestion.anchor
      })
    }
  }

  getSuggestionValue = () => this.state.value

  renderSuggestion = hit => {
    console.log(hit.anchor)
    return (
      <Link
        href={`${hit.url}?query=${encodeURIComponent(this.state.value)}${
          hit.anchor ? `${hit.anchor}` : ''
        }`}
        prefetch
      >
        <a>
          <span className="suggestion__title">
            <Highlight attribute="title" tagName="mark" hit={hit} />
            <div className="tags">
              {hit._tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </span>
          {hit.section && (
            <span className="suggestion__section">
              <Highlight attribute="section" tagName="mark" hit={hit} />
            </span>
          )}
          <span className="suggestion__content">
            <Snippet hit={hit} attribute="content" tagName="mark" />
          </span>
        </a>
      </Link>
    )
  }

  render() {
    const { hits } = this.props
    const { value, inputFocused } = this.state

    const inputProps = {
      placeholder: 'Search...',
      onChange: this.onChange,
      onFocus: this.onToggleFocus,
      onBlur: this.onToggleFocus,
      value
    }

    return (
      <span className={cn('search__container', { focused: inputFocused })}>
        <span className="search__search-icon">
          <SearchIcon />
        </span>

        <AutoSuggest
          suggestions={hits}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          highlightFirstSuggestion={true}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />

        <style jsx global>{`
          .search__container {
            position: relative;
          }

          .search__search-icon {
            position: relative;
            display: flex;
          }

          .search__search-icon svg {
            fill: #999999;
            position: absolute;
            left: 20px;
            z-index: 3;
            top: 11px;
            transition: fill 0.15s ease;
          }

          .suggestion__title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }

          .suggestion__section {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            display: block;
          }

          .suggestion__content {
            font-size: 14px;
            color: #333;
            display: block;
            line-height: 1.6;
          }

          .tags {
            margin-left: 12px;
            height: 22px;
          }

          .tags .tag {
            border-radius: 4px;
            border: 1px solid #eaeaea;
            background: white;
            font-size: 10px;
            text-transform: uppercase;
            padding: 4px 8px;
            margin: 4px 0;
          }

          .tags .tag.docs {
            background: #50e3c2;
          }
          .tags .tag.guide {
            background: #5c52d2;
          }

          .react-autosuggest__suggestion mark {
            color: #000;
            font-weight: 500;
            background: yellow;
          }

          .react-autosuggest__container {
            position: relative;
            margin-left: 12px;
          }

          .react-autosuggest__input {
            width: 240px;
            height: 30px;
            padding: 16px 24px 16px 28px;
            font-size: 14px;
            border: 1px solid transparent;
            border-radius: 4px;
            transition: border 0.15s ease;
            -webkit-appearance: none;
          }

          .react-autosuggest__input:hover {
            border: 1px solid #eaeaea;
          }

          .search__container.focused .react-autosuggest__input,
          .react-autosuggest__input:focus {
            border: 1px solid #ddd;
            outline: 0;
          }

          .search__container.focused .search__search-icon :global(svg) {
            fill: #333;
          }

          .react-autosuggest__suggestions-container {
            display: none;
            max-height: calc(90vh - 148px);
            overflow-y: auto;
          }

          .react-autosuggest__suggestions-container--open {
            display: block;
            position: absolute;
            z-index: 2;
            width: 500px;
            top: 40px;
            background: #ffffff;
            box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
            border-radius: 5px;
          }

          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
            overflow-y: auto;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 10px 20px;
            padding: 12px 16px;
          }

          .react-autosuggest__suggestion:not(:last-child) {
            border-bottom: 1px solid #eaeaea;
          }

          .react-autosuggest__suggestion a {
            text-decoration: none;
            color: black;
          }

          .react-autosuggest__suggestion--highlighted {
            background: #f1f1f1;
          }

          .react-autosuggest__section-container {
            border-top: 1px dashed #ccc;
          }

          .react-autosuggest__section-container--first {
            border-top: 0;
          }

          .react-autosuggest__section-title {
            padding: 10px 0 0 10px;
            font-size: 12px;
            color: #777;
          }

          @media screen and (max-width: 950px) {
            .react-autosuggest__input {
              font-size: 16px;
              width: 100%;
            }

            .react-autosuggest__suggestions-container--open {
              right: 0;
              left: -30px;
              width: 300px;
            }
          }
        `}</style>
      </span>
    )
  }
}

export default withRouter(connectAutoComplete(AutoComplete))
