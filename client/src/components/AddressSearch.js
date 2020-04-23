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
      geocode: '',
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

  renderSearchResults() {
    return (
      <div>
        <div>`${this.state.geocode.lat}/${this.state.geocode.lng}`</div>
        <iframe width="400" height="300" id="gmap_canvas" src={`https://maps.google.com/maps?q=${encodeURI(this.state.inputAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
      </div>
    )
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
