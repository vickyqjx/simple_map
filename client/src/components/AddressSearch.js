import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchResults from './SearchResults';

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAddress: '',
      location: '',
    }
  }

  changeInput(value) {
    this.setState({
      inputAddress: value,
    });
  }

  renderToolbar() {
    return(
      <InputGroup>
        <FormControl
          placeholder="Address"
          aria-label="Address"
          aria-describedby="basic-addon"
          value={this.state.inputAddress}
          onChange={(e) => this.changeInput(e.target.value)}
        />
      </InputGroup>
    );
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <SearchResults address={this.state.inputAddress} />
      </div>
    );
  }
}

export default AddressSearch;
