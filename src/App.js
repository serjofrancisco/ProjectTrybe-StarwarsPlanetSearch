import React from 'react';
import './App.css';
import Table from './components/Table';
import TableFilter from './components/TableFilter';
import TableOrdenation from './components/TableOrdenation';
import PlanetProvider from './contexts/PlanetProvider';

export default function App() {
  return (
    <PlanetProvider>
      <TableFilter />
      <TableOrdenation />
      <Table />
    </PlanetProvider>
  );
}
