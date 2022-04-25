import React, { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

export default function TableFilter() {
  const {
    filterByName,
    setFilterByName } = useContext(PlanetContext);

  return (
    <label htmlFor="nameFilter">
      <input
        id="nameFilter"
        value={ filterByName }
        className="input-filter-name"
        data-testid="name-filter"
        placeholder="Name Search"
        onChange={ ({ target }) => setFilterByName(target.value) }
      />
    </label>
  );
}
