import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const isUserAuthorized = async () =>{
    const authToken = `MHs5b0WfC_tuYZphUjIWCSuzEYpPqiJyh3c48RkfaZh3NXEVLXFI4i2MvBOrhkpfbAkzvKavAPpf4xXL5-Xn-o5R7Y9e0J4QnncbALb9DZmDem53DEhp3D670sDnwEnoP9tc6qNJEDJ2jWBi6Ohbjrzxsl5ojFDxM9ANt4EYZ6kz1MNaVgEx9PkhY1birmFDYBVfeLWr73ABD1Q8o_DQWJl3h57cQTTxRVX7E9UMBfTTCGbnBJT36EXrb7CByqFGrFXyTjPLWZzEZIxN6mfJUnSxYEJl7V_yt43E0NqFlPg7vb9LDjkcyxPJL0I1Iasxhz9c8M3L1fvRHigbmG7h9VafqJmNsLi0zF-oIybRqTrBYcDMrN5xRYXKXG63WuFhRARAtIkRlPVRpIwZe2Z2qfESPGENO4BEoBYtd1ZYPq02pDJd_Axin2aqAiAZmMJ2Fh1XRQTxIyHGaxM_E9gwZyAMsSM` //cookies.get(REACT_APP_SECURE_COOKIE);
    let result = await axios({
        method: 'GET',
        url: `http://localhost:4000/automation/authorization`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: 120000,
      });
      return result.data;
}

export const getBoards = async (query) => {
  const authToken = 'YnN0ZWFtOiFDb25kb3IqKkJT'; 
  let result = await axios({
    method: 'POST',
    url: `https://api.settings.cebroker.com/graphql`,
    data: {
      query: query,
    },
    headers: {
      Authorization: `Basic ${authToken}`,
    },
    timeout: 120000,
  });
  return result.data.data;
};

export const scheduleTask = async (data) =>{
  const authToken = `MHs5b0WfC_tuYZphUjIWCSuzEYpPqiJyh3c48RkfaZh3NXEVLXFI4i2MvBOrhkpfbAkzvKavAPpf4xXL5-Xn-o5R7Y9e0J4QnncbALb9DZmDem53DEhp3D670sDnwEnoP9tc6qNJEDJ2jWBi6Ohbjrzxsl5ojFDxM9ANt4EYZ6kz1MNaVgEx9PkhY1birmFDYBVfeLWr73ABD1Q8o_DQWJl3h57cQTTxRVX7E9UMBfTTCGbnBJT36EXrb7CByqFGrFXyTjPLWZzEZIxN6mfJUnSxYEJl7V_yt43E0NqFlPg7vb9LDjkcyxPJL0I1Iasxhz9c8M3L1fvRHigbmG7h9VafqJmNsLi0zF-oIybRqTrBYcDMrN5xRYXKXG63WuFhRARAtIkRlPVRpIwZe2Z2qfESPGENO4BEoBYtd1ZYPq02pDJd_Axin2aqAiAZmMJ2Fh1XRQTxIyHGaxM_E9gwZyAMsSM` //cookies.get(REACT_APP_SECURE_COOKIE);
  return axios.request({
    method: 'post',
    url: `https://api.providers.test.cebroker.com/automation/task`,
    data,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 120000,
  });
}