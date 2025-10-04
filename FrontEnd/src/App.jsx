import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/home'
import Crypto from './pages/crypto'
import SubmitBlogs from "./pages/submit"
import SignIn from "./pages/signIn"
import LogIn from "./pages/logIn"
import Blog from "./pages/blog"
import Protected from './components/protected'
import Error from './pages/Error'
import BlogDetails from './pages/blogDetails'
import { useSelector } from 'react-redux'
import Update from './pages/update'
import styles from "../src/app.module.css"
import Loader from './components/loader'
import UseAutologin from './hooks/useAutologin'
import './App.css'

function App() {
  const isAuth = useSelector((state)=>state.user.auth);
  const loading = UseAutologin();

  return loading ? <Loader text="..." /> : (
    <>
    <div className={styles.container} >
    <BrowserRouter>
    <div className={styles.layout}>
      <Navbar/>
      <Routes>
        <Route path='/'  element={<div className={styles.main}><Home /></div>} />
        <Route path='/crypto' element={<div className={styles.main}><Crypto /></div>} />
          <Route path='/blogs' element={
          <div className={styles.main}>
          <Protected isAuth={isAuth}>
            <Blog />
          </Protected>
          </div>
          } />
          <Route path='/blogs/:id' element={
          <div className={styles.main}>
          <Protected isAuth={isAuth}>
            <BlogDetails />
          </Protected>
          </div>
          } />
          <Route path='/submitBlog' element={
          <div className={styles.main}>
          <Protected isAuth={isAuth}>
            <SubmitBlogs/>
          </Protected>
          </div>
          } />
        <Route path='/signin' element={<div className={styles.main}><SignIn /></div>} />
        <Route path='/login' element={<div className={styles.main}><LogIn /></div>} />
        <Route path='/update/:id' element={<div className={styles.main}><Update /></div>} />
        <Route path='*' element={<div className={styles.main}><Error /></div>} />
      </Routes>
    </div>
      <Footer/>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
