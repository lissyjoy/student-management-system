import axios from 'axios';
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
export const List = () => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [bData, setBData] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    handleGetAll()
  }, [])

  const handleGetAll = () => {
    axios.get("http://localhost:3002/api/students").then((response) => {
      setBData(response.data.response);
    });
  }

  const handleDelete = (did) => {
    if (did) {
      axios.delete("http://localhost:3002/api/delete-student/" + did).then((response) => {
        if (response?.data?.status) {
          handleGetAll();
        }
      });
    }
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.firstname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },

    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'DOB',
      selector: row => row.dob,
      sortable: true,
    },
    {
      name: 'Education',
      selector: row => row.education,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => {
        return <>
          <a href="javascript:void(0)" title="click here to view survey emission details" onClick={() => {
            navigate(`/edit/${row.id}`);
          }}>Edit</a>
        </>
      }
    },
    {
      name: 'Delete',
      cell: (row) => {
        return <>
          <a href="javascript:void(0)" title="click here to view survey emission details" onClick={(e) =>
            window.confirm("Are you sure to delete ? ") ? handleDelete(row.id) : ""
          }>Delete</a>
        </>
      }
    }
  ];

  const data = bData?.length > 0 ? bData : []

  const filteredItems = data.filter((item) => {
    if (item?.firstname?.toLowerCase().includes(filterText?.toLowerCase()) || item?.lastname?.toLowerCase().includes(filterText?.toLowerCase()) || item?.email?.toLowerCase().includes(filterText?.toLowerCase()) || item?.location?.toLowerCase().includes(filterText?.toLowerCase()) || item?.education?.toLowerCase().includes(filterText?.toLowerCase())) {
      return item;
    }
  }

  );


  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <input type="text" onChange={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder="Search" />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <>
      <header>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">About</h4>
                <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
              </div>

            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx={12} cy={13} r={4} /></svg> */}
              <strong>Student Management System</strong>
            </Link>
          </div>
        </div>
      </header>
      <main role="main">
        <div className="album py-5">
          <div className="container">
            <div className="row">
              <div className='col-md-12'>
                <span>
                  <Link to="/add" className='btn btn-primary'>Add</Link>
                </span>
                <DataTable
                  columns={columns}
                  data={filteredItems}
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                  // selectableRows
                  persistTableHead
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default List