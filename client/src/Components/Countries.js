import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alerts';
import { getCountries } from '../actions/countryList';
import {
  updateUserCountries,
  updateGuestCountries,
} from '../actions/currentUser';
import Country from './Country';
import '../styles/Countries.scss';

const maxSelectedCountries = 10;

const Countries = ({
  currentUser,
  countryList,
  getCountries,
  updateUserCountries,
  updateGuestCountries,
  setAlert,
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
    if (countryList.loaded && !currentUser.guest) {
      console.log('Getting user countries');
      setSelectedCountries(currentUser.countries);
    } else if (countryList.loaded && currentUser.guest) {
      let guestArray = ['united-kingdom'];
      while (guestArray.length < 5) {
        let rand = Math.floor(Math.random() * countryList.countries.length);
        if (!guestArray.includes(countryList.countries[rand].slug)) {
          guestArray.push(countryList.countries[rand].slug);
        }
      }
      setSelectedCountries(guestArray.sort());
    }
  }, [countryList.loaded]);

  //State to hold selected countries
  const [selectedCountries, setSelectedCountries] = useState(
    currentUser.countries
  );

  //Get user selected Countries
  useEffect(() => {
    if (!currentUser.guest) {
      updateUserCountries(selectedCountries);
    } else {
      updateGuestCountries(selectedCountries);
    }
  }, [selectedCountries]);

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
    } else if (!listFull) {
      setSelectedCountries([...selectedCountries, countrySlug]);
    } else {
      setAlert(
        `Maximum countries reached. ${selectedCountries.length}/10`,
        'warning'
      );
    }
  };

  let countrySelectedList = undefined;
  let countryCompleteList = undefined;

  if (countryList.countries.length > 0) {
    countrySelectedList = countryList.countries
      .filter((country) => selectedCountries.includes(country.slug))
      .map((country) => {
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
    countryCompleteList = countryList.countries.map((country) => {
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

  return (
    <Fragment>
      {countrySelectedList ? (
        <Fragment>
          <div className='top'>
            <div className='subheader'>
              <h2>Selected {selectedCountries.length} (max 10)</h2>
              {selectedCountries.length === 0 && (
                <div className='instruction'>
                  Select up to 10 countries from the list below
                </div>
              )}
            </div>

            <div className='CountryList'>{countrySelectedList}</div>
          </div>

          <div className='subheader'>
            <h2>All Countries ({countryCompleteList.length})</h2>
          </div>
          <div className='bottom'>
            <div className='CountryList'>{countryCompleteList}</div>
          </div>
        </Fragment>
      ) : (
        <div className='header'>
          <h1>Loading countries...</h1>
        </div>
      )}
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
  updateUserCountries,
  updateGuestCountries,
})(Countries);
