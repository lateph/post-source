import React, { Component } from 'react';
import Hidden from '@material-ui/core/Hidden';
import AmiMiniHeader from './AmiMiniHeader';
import AmiLargeHeader from './AmiLargeHeader';
import { withRouter } from "react-router-dom";


class AmiHeader extends Component {
  render () {
    // console.log(this.props)
    return (
      <>
        <Hidden smUp>
          <AmiMiniHeader
            history={this.props.history}
            menus={[]}
          />
        </Hidden>
        <Hidden only={'xs'}>
          <AmiLargeHeader  history={this.props.history}/>
        </Hidden>
      </>
    )
  }
}

export default withRouter(AmiHeader);
