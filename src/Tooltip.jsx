import React from "react"
import { Tooltip } from '@instructure/ui-tooltip'
import { View } from '@instructure/ui-view'

export class TooltipExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isShowingContent: props.show
    }
  }

  render () {
    return (
      <>
        <p>
        <Tooltip
         renderTip="Hello. I'm a tool tip"
        isShowingContent={this.state.isShowingContent}
        onShowContent={(e) => {
          this.setState({ isShowingContent: true })
        }}
        onHideContent={(e) => {
          this.setState({ isShowingContent: false })
        }}
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
