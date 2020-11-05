import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCountries } from '../actions/countries';
import Country from './Country';
import '../styles/Countries.scss';

const Countries = ({
  getCountries,
  userCountries,
  countryList,
  countriesLoaded,
}) => {
  //Load countries
  useEffect(() => {
    if (!countriesLoaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countriesLoaded]);

  //State to hold selected countries
  const [selectedCountries, setSelectedCountries] = useState(userCountries);

  let list = undefined;

  console.log(selectedCountries);

  if (countryList.length > 0) {
    list = countryList.map((country) => {
      return (
        <Country
          key={country._id}
          country={country}
          selectedCountries={selectedCountries}
        />
      );
    });
  }

  return (
    <Fragment>
      <div className='Countries'>Countries Page</div>
      {list ? (
        <form>
          <div className='CountryList'>{list}</div>
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
  userCountries: state.auth.user.countries,
});

export default connect(mapStateToProps, { getCountries })(Countries);
