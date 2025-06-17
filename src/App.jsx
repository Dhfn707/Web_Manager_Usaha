import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/about" element={ <div>hello world</div> } />
          <Route path="/" element={ <Home/> } />
          <Route path="/contact" element={ <div>rie jewis</div> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
