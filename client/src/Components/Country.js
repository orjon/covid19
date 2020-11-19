import React, { Fragment } from 'react';
import { default as UncheckedBox } from '@material-ui/icons/CheckBoxOutlineBlank';
import { default as CheckedBox } from '@material-ui/icons/CheckBox';

const Country = ({ country, selectedCountries, listFull }) => {
  let countryName = country.country;

  let flagSource = country.flag;
  let selected = false;

  if (countryName === 'Netherlands Antilles') {
    flagSource =
      'https://www.orjon.com/covid19/images/flag/netherlands_antilles.svg';
  }

  if (selectedCountries.includes(country.slug)) {
    selected = true;
  }

  return (
    <Fragment>
      {selected ? (
        <div className='Country checked '>
          <div className={`checkBox checked ${listFull}`}>
            <CheckedBox style={{ fontSize: 18 }} />
          </div>
          <img
            className='flag'
            src={flagSource}
            alt={`Flag of ${country.country}`}
          />
          <p className='countryName'>{countryName}</p>
        </div>
      ) : (
        <div className={`Country ${listFull}`}>
          <div className={`checkBox unchecked ${listFull}`}>
            <UncheckedBox style={{ fontSize: 18 }} />
          </div>
          <img
            className='flag'
            src={flagSource}
            alt={`Flag of ${country.country}`}
          />
          <p className='countryName'>{countryName}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Country;
