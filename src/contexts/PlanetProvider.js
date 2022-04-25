import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import apiPlanets from '../helpers/apiPlanets';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    (async () => {
      const { results } = await apiPlanets();
      setData(results);
      setSearch(results);
    })();
  }, []);

  useEffect(() => {
    const inputNameFilter = data.filter(({ name }) => name.toLowerCase()
      .includes(filterByName.toLowerCase()));
    setSearch(inputNameFilter);
  }, [data, filterByName]);

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <PlanetContext.Provider
      value={ {
        search,
        setFilterByName,
        filterByName,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}
