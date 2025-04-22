import Layout from "./pages/Layout";
import {Routes, Route} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import {ToastContainer} from 'react-toastify'
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
      <ToastContainer position="bottom-right"></ToastContainer>
    </Layout>
  );
}

export default App;
