import React from 'react'
import { TooltipExample } from './Tooltip'
import { AsyncExample} from './SelectExample'

export function App(props) {

  return (
      <>
          <TooltipExample show={props.show}/>
          <AsyncExample
          options={[
            { id: 'opt0', label: 'Aaron Aaronson' },
            { id: 'opt1', label: 'Amber Murphy' },
            { id: 'opt2', label: 'Andrew Miller' },
            { id: 'opt3', label: 'Barbara Ward' },
            { id: 'opt4', label: 'Byron Cranston', disabled: true },
            { id: 'opt5', label: 'Dennis Reynolds' },
            { id: 'opt6', label: 'Dee Reynolds' },
            { id: 'opt7', label: 'Ezra Betterthan' },
            { id: 'opt8', label: 'Jeff Spicoli' },
            { id: 'opt9', label: 'Joseph Smith' },
            { id: 'opt10', label: 'Jasmine Diaz' },
            { id: 'opt11', label: 'Martin Harris' },
            { id: 'opt12', label: 'Michael Morgan', disabled: true },
            { id: 'opt13', label: 'Michelle Rodriguez' },
            { id: 'opt14', label: 'Ziggy Stardust' },
          ]}
      />
      </>
  )
}

export default App
