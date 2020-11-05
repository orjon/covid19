import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCountries } from '../actions/countries';
import Country from './Country';
import '../styles/Countries.scss';

const Countries = ({ getCountries, countryList }) => {
  useEffect(() => {
    console.log('Getting countries');
    getCountries();
  }, [getCountries]);

  let list = undefined;

  if (countryList.length > 0) {
    list = countryList.map((country) => {
      return <Country key={country._id} country={country} />;
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
  countryList: state.countries.countryList,
});

export default connect(mapStateToProps, { getCountries })(Countries);
