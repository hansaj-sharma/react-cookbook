//styles 
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//page components
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useThemes';
// end of page components



function App() {
  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/create" element={<Create />} />
        </Routes>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
        <Routes>
          <Route exact path="/recipes/:id" element={<Recipe />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
