import React from 'react';
import _ from 'lodash';
import UserList from '../container/UserList';
import MessageBox from '../container/MessageBox';

import { makeData } from '../utils/data';

const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    let filteredData = rawData;

    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id].toLowerCase() + '').includes(nextFilter.value.toLowerCase());
        });
      }, filteredData);
    }
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === 'string'
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? 'desc' : 'asc'))
    );

    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    setTimeout(() => resolve(res), 500);
  });
};

class Chatting extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
      selectedUser: null
    };
  }

  selectUser = id => this.setState({selectedUser: _.find(this.state.data, d => id === d.id)})

  fetchData = (state, instance) => {
    this.setState({ loading: true });
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  crossChat = () => {
    this.setState({selectedUser: null});
  }

  sendMessage = (id, text) => {
    let { data } = this.state;
    data = data.map(d => {
      if(d.id === id) {
        d.messages.push({type: 'sender', text})
      }
      return d;
    })
    this.setState({data});
  }

  render() {
    const { data, pages, loading, selectedUser } = this.state;
    return (
      <div className="chatting">
        <div className="data-table-main">
          <UserList
            selectUser={this.selectUser}
            data={data}
            pages={pages}
            loading={loading}
            fetchData={this.fetchData}
          />
        </div>
        <div className="message-box">
          {selectedUser ? <MessageBox user={selectedUser} crossChat={this.crossChat} sendMessage={this.sendMessage} /> : ''}          
        </div>
      </div>
    );
  }
}

export default Chatting;
