// import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import ChapterList from './pages/ChapterList'
import ChapterDetails from './pages/ChapterDetails'
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
     <ChapterList>
     <Routes>
        {/* <Route path='/'></Route> */}
        <Route path='/ch/:ch_id/:verse' element={<ChapterDetails />}></Route>
     </Routes>
     </ChapterList>
    </div>
  );
}

export default App;
