import React, { useContext, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';

export default function TableOrdenation() {
  const { setOrder } = useContext(PlanetContext);

  const [columns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [ActualSort, setActualSort] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const setSortOnContext = (e) => {
    e.preventDefault();
    setOrder(() => (
      ActualSort
    ));
  };

  const setSort = ({ target: { value } }) => {
    setActualSort((prevState) => ({ ...prevState, sort: value }));
  };

  return (
    <div>
      <form onSubmit={ setSortOnContext }>
        <select
          data-testid="column-sort"
          value={ ActualSort.column }
          name="column"
          onChange={ ({ target: { value } }) => setActualSort(
            (prevState) => ({ ...prevState, column: value }),
          ) }
        >
          {columns.map((element) => (
            <option key={ element } value={ element }>{element}</option>
          ))}
        </select>
        <label htmlFor="asc">
          ASC
          <input
            type="radio"
            id="asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="sort"
            onClick={ setSort }
          />
        </label>
        <label htmlFor="desc">
          DESC
          <input
            type="radio"
            id="desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="sort"
            onClick={ setSort }
          />
        </label>
        <button
          type="submit"
          data-testid="column-sort-button"
        >
          Sort List
        </button>
      </form>
    </div>
  );
}
