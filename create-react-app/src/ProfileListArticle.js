import React, { Component }  from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom'
import { userActions } from './_actions';

const styles = theme => ({
})

class List extends Component {
  state={
    columns: [
      { title: 'Title', field: 'title' },
      // { title: 'View', field: 'title' },
      // { title: 'Title', field: 'title' },
    ],
    data: [
      { title: 'Mehmet' },
      {
        title: 'Zerya Betül',
      },
    ],
  }
  loadData(){
    this.props.getListArticle()
  }

  componentDidMount() {
    // if(this.props.match && this.props.match.params && this.props.match.params.slug){
    this.loadData()
    // }
  }
  view(rowData){
    this.props.history.push(`/post/${rowData.slug}`)
  }
  update(rowData){
    this.props.history.push(`/update/${rowData.slug}`)
  }
  render(){
    return (
      <MaterialTable
        isLoading={this.props.loading}
        style={{boxShadow: 'none'}}
        actions={[
            {
                icon: 'visibility',
                tooltip: 'View',
                onClick: (event, rowData) => {
                  this.view(rowData)
                }
            },
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => {
                this.update(rowData)
              }
          }
        ]}
        title="Editable Example"
        columns={this.state.columns}
        data={this.props.data}
      />
    );
  }
}



function mapState(state) {
  return { 
      // types: state.types.items,
      // tags: state.tags.items,
      loading: state.users.loading,
      // errors: state.users.errors,
      data: state.users.listArticle
  };
}

const actionCreators = {
// updateProfile: userActions.updateProfile,
  getListArticle: userActions.getListArticle,
};

const connectedLoginPage = connect(mapState, actionCreators)(List);

export default withRouter(withStyles(styles)(connectedLoginPage));