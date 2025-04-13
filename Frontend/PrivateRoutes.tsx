import { useLocation, Navigate } from "react-router-dom";

const PrivateRoutes = ({children}: {children: JSX.Element}) => {

    const {state} = useLocation();

  return state?.userLoggedIn ? children : <Navigate to="/log-in" />;
}

export default PrivateRoutes;
