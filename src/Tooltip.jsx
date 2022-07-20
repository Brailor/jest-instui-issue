import React from "react"
import { Tooltip } from '@instructure/ui-tooltip'
import { View } from '@instructure/ui-view'

export class TooltipExample extends React.Component {
  render () {
    console.log("TooltipExample", this.props)
    return (
      <>
        <p>
        <Tooltip
         renderTip="Hello. I'm a tool tip"
         isShowingContent={this.props.show}
        >
            <View>
                Hello There!
            </View>
        </Tooltip>
        </p>
    </>
  )
  }
}
