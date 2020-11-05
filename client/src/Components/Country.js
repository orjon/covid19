import React from 'react';
import { default as UncheckedBox } from '@material-ui/icons/CheckBoxOutlineBlank';
import { default as CheckedBox } from '@material-ui/icons/CheckBox';

const Country = ({ country, selectedCountries }) => {
  let countryName = country.Country.split('(')[0]
    .split(',')[0]
    .replace(' and ', ' & ');

  let flagSource = country.Flag;
  let selected = false;

  if (countryName === 'ALA Aland Islands') {
    countryName = 'Aland Islands';
  } else if (countryName === 'Netherlands Antilles') {
    flagSource =
      'https://www.orjon.com/covid19/images/flag/netherlands_antilles.svg';
  } else if (country.Slug === 'korea-north') {
    countryName = 'North Korea';
  }

  if (selectedCountries.includes(country.ISO2)) {
    selected = true;
  }

  return (
    <div className='Country'>
      {selected ? (
        <div className='checkBox checked'>
          <CheckedBox style={{ fontSize: 18 }} />
        </div>
      ) : (
        <div className='checkBox unchecked'>
          <UncheckedBox style={{ fontSize: 18 }} />
        </div>
      )}
      <img
        className='flag'
        src={flagSource}
        alt={`Flag of ${country.Country}`}
      />
      <p className='countryName'>{countryName}</p>
    </div>
  );
};

export default Country;
