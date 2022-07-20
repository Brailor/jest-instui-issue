import React from 'react'
import { render, act, fireEvent} from '@testing-library/react'
import { AsyncExample} from './SelectExample'

// suppress instui warnings
// global.console = {error: jest.fn(), warn: jest.fn(), log: jest.fn()}

describe("testing with jest", () => {
     beforeEach(() => {
        jest.useFakeTimers()
     })

    it("should render Select", () => {
        const { getByLabelText, getByText } = render(
            <AsyncExample options={[
                { id: 'opt0', label: 'Aaron Aaronson' },
                { id: 'opt1', label: 'Amber Murphy' },
                { id: 'opt2', label: 'Andrew Miller' },
            ]}
            />)

        const selectInput = getByLabelText(/Async Select/i)

        fireEvent.click(selectInput)
        fireEvent.change(selectInput, {target: {value: 'Aa'}})

        act(() => jest.runAllTimers())

        const result = getByText("Aaron Aaronson")

        console.log(result)

        expect(result).not.toBe(null)
    })
})
