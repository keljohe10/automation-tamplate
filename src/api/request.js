import axios from 'axios';
import Cookies from 'universal-cookie';

const {
  REACT_APP_TIMEOUT = 120000,
  REACT_APP_SECURE_COOKIE,
  REACT_APP_PROVIDER_CORE_API_URL,
  REACT_APP_SETTING_SERVICES_URL,
  REACT_APP_API_KEY_SETTING_SERVICES
} = process.env;

const cookies = new Cookies();

export const isUserAuthorized = async () =>{
    const authToken = `MHs5b0WfC_tuYZphUjIWCSuzEYpPqiJyh3c48RkfaZh3NXEVLXFI4i2MvBOrhkpfbAkzvKavAPpf4xXL5-Xn-o5R7Y9e0J4QnncbALb9DZmDem53DEhp3D670sDnwEnoP9tc6qNJEDJ2jWBi6Ohbjrzxsl5ojFDxM9ANt4EYZ6kz1MNaVgEx9PkhY1birmFDYBVfeLWr73ABD1Q8o_DQWJl3h57cQTTxRVX7E9UMBfTTCGbnBJT36EXrb7CByqFGrFXyTjPLWZzEZIxN6mfJUnSxYEJl7V_yt43E0NqFlPg7vb9LDjkcyxPJL0I1Iasxhz9c8M3L1fvRHigbmG7h9VafqJmNsLi0zF-oIybRqTrBYcDMrN5xRYXKXG63WuFhRARAtIkRlPVRpIwZe2Z2qfESPGENO4BEoBYtd1ZYPq02pDJd_Axin2aqAiAZmMJ2Fh1XRQTxIyHGaxM_E9gwZyAMsSM` //cookies.get(REACT_APP_SECURE_COOKIE);
    let result = await axios({
        method: 'GET',
        url: `${REACT_APP_PROVIDER_CORE_API_URL}/automation/authorization`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: REACT_APP_TIMEOUT,
      });
      return result.data;
}

export const getBoards = async (query) => {
  let result = await axios({
    method: 'POST',
    url: `${REACT_APP_SETTING_SERVICES_URL}/graphql`,
    data: {
      query: query,
    },
    headers: {
      Authorization: `Basic ${REACT_APP_API_KEY_SETTING_SERVICES}`,
    },
    timeout: REACT_APP_TIMEOUT,
  });
  return result.data.data;
};

export const scheduleTask = async (data) =>{
  const authToken = `MHs5b0WfC_tuYZphUjIWCSuzEYpPqiJyh3c48RkfaZh3NXEVLXFI4i2MvBOrhkpfbAkzvKavAPpf4xXL5-Xn-o5R7Y9e0J4QnncbALb9DZmDem53DEhp3D670sDnwEnoP9tc6qNJEDJ2jWBi6Ohbjrzxsl5ojFDxM9ANt4EYZ6kz1MNaVgEx9PkhY1birmFDYBVfeLWr73ABD1Q8o_DQWJl3h57cQTTxRVX7E9UMBfTTCGbnBJT36EXrb7CByqFGrFXyTjPLWZzEZIxN6mfJUnSxYEJl7V_yt43E0NqFlPg7vb9LDjkcyxPJL0I1Iasxhz9c8M3L1fvRHigbmG7h9VafqJmNsLi0zF-oIybRqTrBYcDMrN5xRYXKXG63WuFhRARAtIkRlPVRpIwZe2Z2qfESPGENO4BEoBYtd1ZYPq02pDJd_Axin2aqAiAZmMJ2Fh1XRQTxIyHGaxM_E9gwZyAMsSM` //cookies.get(REACT_APP_SECURE_COOKIE);
  return axios.request({
    method: 'post',
    url: `${REACT_APP_PROVIDER_CORE_API_URL}/automation/task`,
    data,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    timeout: REACT_APP_TIMEOUT,
  });
}