import './App.css';
import Toolbar from './Components/UI/ToolBar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';


function App() {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/*<Route path="/add-transaction" element={<AddNewDish/>}/>*/}
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
