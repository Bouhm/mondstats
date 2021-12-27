import { Location } from 'history';
import { useMemo } from 'react';
import { BrowserRouter, useLocation, useNavigate, Location as RouterLocation } from 'react-router-dom';

const RouteAdapter: React.FunctionComponent<{
  children: React.FunctionComponent<{
    history: {
      replace(location: Location): void;
      push(location: Location): void;
    },
    location: RouterLocation }>;
}> = ({ children }) => {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(location: Location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        navigate(location, { replace: false, state: location.state });
      },
    }), [navigate],
  );
  if (!children) {
    return null;
  }
  return children({ history: adaptedHistory, location: routerLocation });
};

export default RouteAdapter;