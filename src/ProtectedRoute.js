// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './components/AuthContext';

// const ProtectedRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/auth/login" replace />
//   );
// };

// export default ProtectedRoute;
