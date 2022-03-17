import { useHistory } from 'react-router-dom';

function useNavigate() {
  const history = useHistory();
  return (path: string | number) => {
    if (path === -1) {
      history.goBack();
    } else {
      history.push(path);
    }
  };
}

export default useNavigate;
