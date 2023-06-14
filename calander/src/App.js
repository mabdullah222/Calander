import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Year from './components/Year'
import Month from "./components/Month"
import Week from "./components/Week"

function App() {
  let date=new Date
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/year" element={<Year></Year>}></Route>
        <Route path="/" element={<Month inyear={new Date().getFullYear()} indate={date.getDate()} inmonth={date.getMonth()} toshow={true}></Month>}></Route>
        <Route path="/week" element={<Week days={[]} dates={[]}></Week>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
