import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from './Nav/Nav';
import { setAlert } from '../actions/alerts';
import { getCountries } from '../actions/countryList';
import { updateCountries } from '../actions/currentUser';
import { countryNameFromSlug } from '../utils/helpers';
import Country from './Country';
import '../styles/Countries.scss';

const maxSelectedCountries = 10;

const Countries = ({
  currentUser,
  countryList,
  getCountries,
  updateCountries,
  setAlert,
}) => {
  let countries = countryList.countries;
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
    let countryName = countryNameFromSlug(countrySlug, countries);
    // Remove if already in list
    if (selectedCountries.includes(countrySlug)) {
      setSelectedCountries(
        selectedCountries.filter((country) => country !== countrySlug)
      );
      setAlert(
        `${countryName} removed. ${selectedCountries.length - 1}/10`,
        'success'
      );
      // Add to list if total does not exceed 10
    } else if (!listFull) {
      setSelectedCountries([...selectedCountries, countrySlug]);
      if (selectedCountries.length + 1 === 10) {
        setAlert(
          `${countryName} added. Maximum reached: ${
            selectedCountries.length + 1
          }/10`,
          'warning'
        );
      } else {
        setAlert(
          `${countryName} added. ${selectedCountries.length + 1}/10`,
          'success'
        );
      }
    } else {
      setAlert(
        `Maximum countries reached. ${selectedCountries.length}/10`,
        'warning'
      );
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
      <Nav />
      <div className='pageWrapper'>
        <div className='Countries'>
          {/* Selected Countries to Compare: {selectedCountries.length} */}
        </div>
        {countrySelectionList ? (
          <form
            className='longForm'
            onSubmit={(e) => {
              e.preventDefault();
              updateCountries(selectedCountries);
              console.log('redirect!');
              return <Redirect to='/stats' />;
            }}
          >
            <div className='header'>
              <h1>Select countries (max 10)</h1>
            </div>
            <div className='buttonWrapper'>
              <button type='submit' className='center'>
                Save
              </button>
            </div>
            <div className='CountryList'>{countrySelectionList}</div>
            <div className='buttonWrapper'>
              <button type='submit' className='center'>
                Save
              </button>
            </div>
          </form>
        ) : (
          <form>
            <div className='header'>
              <h1>Loading countries...</h1>
            </div>
          </form>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  countryList: state.countryList,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {
  setAlert,
  getCountries,
  updateCountries,
})(Countries);
