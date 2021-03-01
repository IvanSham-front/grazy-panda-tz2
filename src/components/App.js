import React, { Component } from 'react';
import Table from './Table';
import Pager from './Pager';
import Filter from './Filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      data: [],
      filterValue: '',
      pagerCount: 1
    };

    this.pagerClick = this.pagerClick.bind(this);
    this.pagerDefault = this.pagerDefault.bind(this);
    this.filterOnChange = this.filterOnChange.bind(this);

    const url = 'http://www.filltext.com/?rows=500&id={number|500}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}';
    window.onload = () => {
      fetch(url)
      .then(responce => responce.json())
      .then(data => {
        this.setState({
          data,
          isLoaded: true
        })
        this.state.dataSplit(data, 50);

      })
    }
  }

  pagerDefault(defaultData, dataSplit) {
    this.setState({ tableData: defaultData, dataSplit});
    this.setState({ saveTableData: defaultData})
  }

  pagerClick(paginateData, i) {
    this.setState({ tableData: paginateData , pagerCount: i});
    
  }

  filterOnChange(filterValue) {
    this.setState({filterValue})
    const filterData = this.filterData(this.state.data, filterValue);
    if (filterValue.length < 1) {
      this.pagerDefault(this.state.saveTableData, this.state.dataSplit);
    } else {
      this.setState({ tableData: filterData });
    }
  }

  
  filterData(data, value) {
    if (!value) {
      return [];
    }
    const result = [];
    data.forEach(item => {
      for (let key in item) {
        if (typeof item[key] == 'string' && item[key].includes(value)) {
          result.push(item);
        }
      }
    });
    return result;
  }


  renderTable() {
    if (!this.state.tableData) {
      return <div className="spinner-border loading"></div>;
    }

    return <Table data={this.state.tableData} />;
  }

  renderPager() {
    if (!this.state.data) {
      return <b>Pager Loading...</b>;
    }
    return (
      <Pager
        data={this.state.data}
        count="50"
        pagerClick={this.pagerClick}
        pagerDefault={this.pagerDefault}
        pagerCount={this.state.pagerCount}
      />
    );
  }

  render() {
    return (
      <div className="App container">
        <h1 className="text-center">Users List</h1>
        <Filter data={this.state.data}
          filterValue={this.state.filterValue}
          filterOnChange={this.filterOnChange} />
        {this.renderTable()}
        {this.renderPager()}
      </div>
    );
  }
}

export default App;
