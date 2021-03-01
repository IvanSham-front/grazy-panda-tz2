import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.filterOnChange(event.target.value);
  }


  render() {
    return (
      <div className="input-group row">
        <div className="col-12 input-group input-group-lg">
          <input
            value={this.props.filterValue}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default Filter;
