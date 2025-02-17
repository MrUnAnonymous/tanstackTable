import './App.css'
import './index.css'
import BasicTable from './components/BasicTAble'
import React from 'react';
import mData from "./MOCK_DATA.json";

function App() {
  const data = React.useMemo(() => mData, []);
    const columns = [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Gender",
        accessorKey: "gender",
      },
      {
        header: "Date of Birth",
        accessorKey: "dob",
      },
    ];
  return (
    <>
      <h1 className='flex m-5 justify-center text-3xl font-serif font-bold'>React Table</h1>
     <BasicTable data={data} columns={columns}/>
    </>
  )
}

export default App
