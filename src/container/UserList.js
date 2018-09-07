import React from 'react';
import Button from '@material-ui/core/Button';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class UserList extends React.Component {
  render() {
    const { data, pages, loading, fetchData } = this.props;
    const { selectUser } = this.props;
    return (
       <ReactTable
        columns={[
          {
            Header: 'FIRST NAME',
            accessor: 'firstName',
            Filter: ({filter, onChange}) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ''}
                placeholder="First Name"
                style={{
                  width: '100%'
                }}
              />
            )
          },
          {
            Header: 'LAST NAME',
            id: 'lastName',
            accessor: d => d.lastName,
            Filter: ({filter, onChange}) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ''}
                placeholder="Last Name"
                style={{
                  width: '100%'
                }}
              />
            )
          },
          {
            Header: 'AGE',
            accessor: 'age',
            Filter: ({filter, onChange}) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ''}
                placeholder="Age"
                style={{
                  width: '100%'
                }}
              />
            )
          },
          {
            Header: 'EMAIL',
            accessor: 'email',
            Filter: ({filter, onChange}) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ''}
                placeholder="Email Address"
                style={{
                  width: '100%'
                }}
              />
            )
          },
          {
            Header: 'Message',
            accessor: 'message',
            Cell: props => <Button color="primary" onClick={() => selectUser(props.original.id)}>IM</Button>,
            sortable: false,
            filterable: false
          }
        ]}
        manual
        data={data}
        pages={pages}
        loading={loading}
        onFetchData={fetchData}
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }
}

export default UserList;
