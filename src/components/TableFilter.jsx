import React, { useContext, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';

export default function TableFilter() {
  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues } = useContext(PlanetContext);

  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [ActualFilter, setActualFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const testEquality = () => {
    let result = false;
    const currentFilter = Object.values(ActualFilter);
    filterByNumericValues.forEach((el) => {
      if (Object.values(el)[0] === currentFilter[0]) { result = true; }
    });
    return result;
  };

  const addFilterByValues = (e) => {
    e.preventDefault();
    const teste = testEquality();
    if (teste === false) {
      setFilterByNumericValues((prevState) => (
        [...prevState, ActualFilter]
      ));
      const filter = columns.filter((el) => el !== ActualFilter.column);
      setColumns(filter);
    }
  };

  const removeFilter = ({ target }) => {
    const filter = filterByNumericValues.filter((el) => el.column !== target.id);
    setFilterByNumericValues(filter);
    setColumns((prevState) => (
      [...prevState, target.id]
    ));
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <>
      <label htmlFor="nameFilter">
        <input
          id="nameFilter"
          value={ filterByName }
          className="input-filter-name"
          data-testid="name-filter"
          placeholder="Name Search"
          onChange={ ({ target: { value } }) => setFilterByName(value) }
        />
      </label>
      <form onSubmit={ addFilterByValues }>
        <div className="select">
          <select
            data-testid="column-filter"
            value={ ActualFilter.column }
            name="column"
            onChange={ ({ target: { value } }) => setActualFilter(
              (prevState) => ({ ...prevState, column: value }),
            ) }
          >
            {columns.map((element) => (
              <option key={ element } value={ element }>{element}</option>
            ))}
          </select>
        </div>
        <div className="select">
          <select
            data-testid="comparison-filter"
            value={ ActualFilter.comparison }
            onChange={ ({ target: { value } }) => setActualFilter(
              (prevState) => ({ ...prevState, comparison: value }),
            ) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>
        <input
          type="number"
          data-testid="value-filter"
          className="input-number"
          value={ ActualFilter.value }
          onChange={ ({ target: { value } }) => setActualFilter(
            (prevState) => ({ ...prevState, value }),
          ) }
        />
        <button
          type="submit"
          data-testid="button-filter"
          className="btn-filter"
        >
          Filter
        </button>
      </form>
      <div>
        {filterByNumericValues.map(({ column, comparison, value }) => (
          <div key={ column } data-testid="filter">
            <p>{`${column} ${comparison} ${value}`}</p>
            <button
              type="button"
              id={ column }
              onClick={ removeFilter }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Todos os Filtros
      </button>
    </>
  );
}
