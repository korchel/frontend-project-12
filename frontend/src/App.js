import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<div>No page is selected.</div>} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
