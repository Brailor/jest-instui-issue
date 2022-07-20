import React from 'react';
import { Alert } from '@instructure/ui-alerts'
import { Select } from '@instructure/ui-select'

export class AsyncExample extends React.Component {
  state = {
    inputValue: '',
    isShowingOptions: false,
    isLoading: false,
    highlightedOptionId: null,
    selectedOptionId: null,
    selectedOptionLabel: '',
    filteredOptions: [],
    announcement: null
  }

  timeoutId = null

  getOptionById (queryId) {
    return this.state.filteredOptions.find(({ id }) => id === queryId)
  }

  filterOptions = (value) => {
    return this.props.options.filter(option => (
      option.label.toLowerCase().startsWith(value.toLowerCase())
    ))
  }

  matchValue () {
    const {
      filteredOptions,
      inputValue,
      selectedOptionId,
      selectedOptionLabel
    } = this.state

    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0]
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: onlyOption.label,
          selectedOptionId: onlyOption.id
        }
      }
    }
    // allow user to return to empty input and no selection
    if (inputValue.length === 0) {
      return { selectedOptionId: null, filteredOptions: [] }
    }
    // no match found, return selected option label to input
    if (selectedOptionId) {
      return { inputValue: selectedOptionLabel }
    }
  }

  handleShowOptions = (event) => {
    this.setState(({ filteredOptions }) => ({
      isShowingOptions: true
    }))
  }

  handleHideOptions = (event) => {
    const { selectedOptionId, inputValue } = this.state
    this.setState({
      isShowingOptions: false,
      highlightedOptionId: null,
      announcement: 'List collapsed.',
      ...this.matchValue()
    })
  }

  handleBlur = (event) => {
    this.setState({ highlightedOptionId: null })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const option = this.getOptionById(id)
    if (!option) return // prevent highlighting of empty option
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option.label : state.inputValue,
      announcement: option.label
    }))
  }

  handleSelectOption = (event, { id }) => {
    const option = this.getOptionById(id)
    if (!option) return // prevent selecting of empty option
    this.setState({
      selectedOptionId: id,
      selectedOptionLabel: option.label,
      inputValue: option.label,
      isShowingOptions: false,
      announcement: `${option.label} selected. List collapsed.`,
      filteredOptions: [this.getOptionById(id)]
    })
  }

  handleInputChange = (event) => {
    const value = event.target.value
    clearTimeout(this.timeoutId)

    if (!value || value === '') {
      this.setState({
        isLoading: false,
        inputValue: value,
        isShowingOptions: true,
        selectedOptionId: null,
        selectedOptionLabel: null,
        filteredOptions: [],
      })
    } else {
      this.setState({
        isLoading: true,
        inputValue: value,
        isShowingOptions: true,
        filteredOptions: [],
        highlightedOptionId: null,
        announcement: 'Loading options.'
      })

      this.timeoutId = setTimeout(() => {
        const newOptions = this.filterOptions(value)
        this.setState({
          filteredOptions: newOptions,
          isLoading: false,
          announcement: `${newOptions.length} options available.`
        })
      }, 1500)
    }
  }

  render () {
    const {
      inputValue,
      isShowingOptions,
      isLoading,
      highlightedOptionId,
      selectedOptionId,
      filteredOptions,
      announcement
    } = this.state

    return (
      <div>
        <Select
          renderLabel="Async Select"
          assistiveText="Type to search"
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onInputChange={this.handleInputChange}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
                isDisabled={option.disabled}
              >
                {option.label}
              </Select.Option>
            )
          }) : (
            <Select.Option id="empty-option" key="empty-option">
              {isLoading
                ? "loading"
                : inputValue !== '' ? 'No results' : 'Type to search'}
            </Select.Option>
          )}
        </Select>
      </div>
    )
  }
}

