import { Component } from 'react'
import Link from 'next/link'
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
    value: this.props.currentRefinement
  }

  onChange = (_, { newValue }) => {
    if (!newValue) {
      this.props.onSuggestionCleared()
    }

    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  getSuggestionValue(hit) {
    return hit.title
  }

  renderSuggestion(hit) {
    return (
      <Link href={hit.url}>
        <a>
          <span className="suggestion__title">
            <Highlight attribute="title" tagName="mark" hit={hit} />
          </span>
          {hit.section && (
            <span className="suggestion__section">
              <Highlight attribute="section" tagName="mark" hit={hit} />
            </span>
          )}
          <span className="suggestion__content">
            <Snippet hit={hit} attribute="content" tagName="mark" />
          </span>
          <div className="tags">
            {hit._tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </a>
      </Link>
    )
  }

  render() {
    const { hits, onSuggestionSelected } = this.props
    const { value } = this.state

    const inputProps = {
      placeholder: 'Search...',
      onChange: this.onChange,
      value
    }

    return (
      <span className="search__container">
        <span className="search__search-icon">
          <SearchIcon />
        </span>
        <AutoSuggest
          suggestions={hits}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
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
          }

          .suggestion__title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            display: block;
          }

          .suggestion__section {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            display: block;
          }

          .suggestion__content {
            font-size: 14px;
            color: #666;
            display: block;
            line-height: 1.4;
          }

          .tags {
            padding: 12px 0 4px;
          }

          .tags .tag {
            border-radius: 4px;
            border: 1px solid #eaeaea;
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
            color: #0076ff;
            font-weight: 500;
            background: transparent;
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
          }

          .react-autosuggest__input:focus {
            outline: none;
            border: 1px solid #eaeaea;
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
            border-bottom: 1px solid #eaeaea;
            padding: 12px 16px;
          }

          .react-autosuggest__suggestion a {
            text-decoration: none;
            color: black;
          }

          .react-autosuggest__suggestion--highlighted {
            background: #fafbfc;
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

export default connectAutoComplete(AutoComplete)
