import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import List from './Student/List';
import Add from './Student/Add';
import Edit from './Student/Edit';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          {/* <Route path="/about"> <About /> </Route> */}
          {/* <Route path="/users"> <Users /> </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
