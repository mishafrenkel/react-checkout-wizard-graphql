import React from 'react'
import Autosuggest from 'react-autosuggest'

const styles = {
  container: {
    position: 'relative',
    height: '100%',
  },
  input: {
    width: '100%',
    height: '100%',
    padding: '18.5px 14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1rem',
    lineHeight: 1,
    border: '1px solid #aaa',
    borderRadius: '4px',
  },
  inputFocused: {
    outline: 'none',
  },
  inputOpen: {
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    border: '1px solid #aaa',
    borderTop: 0,
    backgroundColor: '#fff',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1rem',
    lineHeight: 1,
    zIndex: 2,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px',
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd',
  },
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (options, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : options.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

export default class Example extends React.Component {
  constructor() {
    super()

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    }
  }

  componentDidMount() {
    if (this.props.input.value) {
      this.setState({
        value: this.props.input.value,
      })
      this.props.input.onChange(this.props.input.value)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.input.value !== prevProps.input.value) {
      this.setState({
        value: this.props.input.value,
      })
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.input.onChange(suggestionValue)
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.props.options, value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Country',
      value,
      onChange: this.onChange,
      autoComplete: 'disabled',
    }

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={styles}
      />
    )
  }
}
