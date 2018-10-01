import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import './mainpage.css';
import SearchBar from './searchbar';
import data from '../../data';
import {DropdownToggle, DropdownMenu, DropdownItem, Button, UncontrolledDropdown, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultsModal from '../Modals/resultsmodal';

// This is our Search Results page. Users will be brought here after clicking the 'search' button
// from the Search Bar. There are 'filter by' dropdowns and a 'sort-by' dropdown, followed by the
// search results. As with the main content, I chose to represent the result cards as Buttons. 
// This is rendered in MainPage.

const styles = {
    resultCardStyles: {


    },
    resultStyles: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    }
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      data: data
    };
  }
   
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRenderSearchResults = () => {
        if (this.props.location.state !== undefined) {
            if (this.props.location.state.searchResults.length > 1) {
                return ( this.props.location.state.searchResults.map((car) => {
                    console.log("CAR DATA: ", car);
                    return (
                    <Col lg="3" md="6" key={car._id}>
                        <div style={styles.resultCardStyles}>
                            <ResultsModal {...car} />
                        </div>
                    </Col>
                    );
                }));
            } else {
                console.log("CAR DATA: ", this.props.location.state.searchResults);
                return (
                    <Col lg="3" md="6" key={this.props.location.state.searchResults._id}>
                        <div style={styles.resultCardStyles}>
                            <ResultsModal {...this.props.location.state.searchResults} />
                        </div>
                    </Col>
                );
            }
        }
    }

  handleRedirect = () => {
      if (this.props.location.state === undefined){
        return <Redirect to='/' />
      } else {
          return <SearchBar isLoggedIn={this.props.location.state.isLoggedIn}/>
      }
  }

    render() { 
        console.log(this.props.location.state);
        return (
            <div>
                {this.handleRedirect()}
                <div className="filter-row">
                    <div className="filters"> 
                        <h5>Filter by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>TODO:</DropdownItem>
                                <DropdownItem disabled>map reviewers onto this list</DropdownItem>
                                <DropdownItem>IheartPrius</DropdownItem>
                                <DropdownItem>FordStrong</DropdownItem>
                                <DropdownItem>ToyotaJim</DropdownItem>
                                <DropdownItem>MommaJeep</DropdownItem>
                                <DropdownItem>BMWsRcool</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Owned
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Rented</DropdownItem>
                                <DropdownItem>Driven</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <div className="sort-by">
                        <h5>Sort by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Rating Up</DropdownItem>
                                <DropdownItem>Rating Down</DropdownItem>
                                <DropdownItem>Year Up</DropdownItem>
                                <DropdownItem>Year Down</DropdownItem>
                                <DropdownItem>Date of Review</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <div style={styles.resultStyles}>
                    {this.handleRenderSearchResults()}
                </div>
            </div>
        );
    }
}
 
export default SearchResults;
