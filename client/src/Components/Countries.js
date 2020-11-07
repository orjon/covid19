import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCountries } from '../actions/countryList';
import { updateCountries } from '../actions/currentUser';
import Country from './Country';
import '../styles/Countries.scss';

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

  const toggleCountry = (countryISO2) => {
    if (selectedCountries.includes(countryISO2)) {
      setSelectedCountries(
        selectedCountries.filter((country) => country !== countryISO2)
      );
    } else {
      setSelectedCountries([...selectedCountries, countryISO2]);
    }
  };

  let countrySelectionList = undefined;

  if (countryList.countries.length > 0) {
    countrySelectionList = countryList.countries.map((country) => {
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
      {countrySelectionList ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Submitting: ', selectedCountries);
            console.log(typeof selectedCountries);

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
