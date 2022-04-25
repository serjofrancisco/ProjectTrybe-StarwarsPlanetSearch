import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import apiPlanets from '../helpers/apiPlanets';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await apiPlanets();
      setData(results);
      setSearch(results);
    })();
  }, []);

  useEffect(() => {
    const Filter = data.filter(({ name }) => name.toLowerCase()
      .includes(filterByName.toLowerCase()))
      .filter((element) => filterByNumericValues.every(
        ({ column, comparison, value }) => {
          switch (comparison) {
          case 'maior que':
            return Number(element[column]) > Number(value);
          case 'menor que':
            return Number(element[column]) < Number(value);
          case 'igual a':
            return Number(element[column]) === Number(value);
          default:
            return false;
          }
        },
      ));
    setSearch(Filter);
  }, [data, filterByName, filterByNumericValues]);

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <PlanetContext.Provider
      value={ {
        search,
        setFilterByName,
        filterByName,
        filterByNumericValues,
        setFilterByNumericValues,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}
