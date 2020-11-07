import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCountries } from '../actions/countries';
import Country from './Country';
import '../styles/Countries.scss';

const Countries = ({ getCountries, user, countryList, countriesLoaded }) => {
  //Load countries
  useEffect(() => {
    if (!countriesLoaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countriesLoaded]);

  let userCountries = [];

  if (user && user.countries.length > 0) {
    userCountries = user.countries;
  }

  //State to hold selected countries
  const [selectedCountries, setSelectedCountries] = useState(userCountries);

  const toggleCountry = (countryISO2) => {
    if (selectedCountries.includes(countryISO2)) {
      setSelectedCountries(
        selectedCountries.filter((country) => country !== countryISO2)
      );
    } else {
      setSelectedCountries([...selectedCountries, countryISO2]);
    }
  };

  let countrylist = undefined;

  if (countryList.length > 0) {
    countryList = countryList.map((country) => {
      return (
        <div key={country._id} onClick={() => toggleCountry(country.ISO2)}>
          <Country country={country} selectedCountries={selectedCountries} />
        </div>
      );
    });
  }

  return (
    <Fragment>
      <div className='Countries'>Countries Page</div>
      {countryList ? (
        <form>
          <div className='CountryList'>{countryList}</div>
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
  countriesLoaded: state.countries.loaded,
  countryList: state.countries.countryList,
  user: state.user,
});

export default connect(mapStateToProps, { getCountries })(Countries);
