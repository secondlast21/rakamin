import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'
import RequireAuth from './components/Auth'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/todo' />}
        />
        <Route
          path='/'
          element={<Outlet />}
        >
          <Route
            path='register'
            element={<Register />}
          />
          <Route
            path='login'
            element={<Login />}
          />
          <Route
            path='todo'
            element={
              <RequireAuth>
                <Todo />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
