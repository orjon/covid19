import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCountries } from '../actions/countryList';
import { updateCountries } from '../actions/currentUser';
import Country from './Country';
import '../styles/Countries.scss';

const maxSelectedCountries = 10;

const Countries = ({
  currentUser,
  countryList,
  getCountries,
  updateCountries,
}) => {
  //Load countryList
  useEffect(() => {
    if (!countryList.loaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countryList]);

  //Get user selected Countries
  useEffect(() => {
    setSelectedCountries(currentUser.countries);
  }, [currentUser]);

  //State to hold selected countries
  const [selectedCountries, setSelectedCountries] = useState([]);

  let listFull = false;

  if (selectedCountries.length >= maxSelectedCountries) {
    listFull = true;
  } else {
    listFull = false;
  }

  const toggleCountry = (countrySlug) => {
    // Remove if already in list
    if (selectedCountries.includes(countrySlug)) {
      setSelectedCountries(
        selectedCountries.filter((country) => country !== countrySlug)
      );
      // Add to list if total does not exceed 10
    } else if (!listFull) {
      setSelectedCountries([...selectedCountries, countrySlug]);
    }
  };

  let countrySelectionList = undefined;

  if (countryList.countries.length > 0) {
    countrySelectionList = countryList.countries.map((country) => {
      return (
        <div
          key={country._id}
          className='countryContainer'
          onClick={() => toggleCountry(country.slug)}
        >
          <Country
            country={country}
            selectedCountries={selectedCountries}
            listFull={listFull}
          />
        </div>
      );
    });
  }

  // Redirect if not logged in
  if (!currentUser.loaded) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <div className='Countries'>
        Selected Countries: {selectedCountries.length}
      </div>
      {countrySelectionList ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateCountries(selectedCountries);
          }}
        >
          <div className='CountryList'>{countrySelectionList}</div>
          <div className='field'>
            <button type='submit' className='center'>
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  countryList: state.countryList,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { getCountries, updateCountries })(
  Countries
);
