import { useContext } from 'react';

import authoerizationContext from '../contexts/index.js';

const useAuth = () => useContext(authoerizationContext);

export default useAuth;
