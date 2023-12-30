import './App.css';
import Toolbar from './Components/UI/ToolBar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Categories from './Containers/Categories/Categories';
import Home from './Containers/Home/Home';
import AddTransaction from './Containers/AddTransaction/AddTransaction';


const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <main className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add-transaction" element={<AddTransaction/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="*" element={(<h1>Not found</h1>)}/>
      </Routes>
    </main>
  </>
);

export default App;
