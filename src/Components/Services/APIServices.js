import axios from 'axios';
import { Local_API, Prod_API } from '../Config/Env';

// const userApiService = Prod_API
const userApiService = Local_API
let returnValue;
const token = localStorage.getItem("refreshToken")
const config = { headers: { Authorization: `Bearer ${token}` } }

class APIServices {
  async login(email, password) {
    try {
      let newUserData = {
        "email": email,
        "password": password
      }
      const serviceData = {
        method: 'POST',
        url: userApiService + '/user/login',
        data: newUserData,
        withCredentials: true,
      };
      await axios(serviceData).then((response) => {
        returnValue = response;
        localStorage.setItem("refreshToken", response.data.refreshToken)
      });
    }
    catch (error) {
      return error.response
    }
    return returnValue;
  }
  async loginRaspi(setState, ipList) {
    // const ipList = [];
    let ips = 'http://192.168.1.';
    let newIp;

    try {
      for (let i = 0; i < 256; i++) {
        newIp = axios.get(ips + `${i}` + ':5000/local').then((response) => {
          // ipList.push(response);
          let newListState = [...ipList];
          newListState.push(response.data)
          setState(newListState)
        }).catch(error => {
          console.log(error)
        })
      }
    }
    catch (error) {
      return error.response
    }
  }
  async recognizeRaspi(raspIp, odaName) {
    console.log(raspIp);
    console.log(odaName);
    try {
      let newUserData = {
        "odaName": odaName
      }
      console.log(newUserData)
      const serviceData = {
        method: 'POST',
        url: 'http://' + raspIp + ':5000/odaName',
        data: newUserData,
      };
      return await axios(serviceData);

    } catch (error) {
      return error.response
    }

  }
  async register(firstName, secondName, email, password, confPassword) {
    try {
      let newUserData = {
        "firstName": firstName,
        "secondName": secondName,
        "email": email,
        "password": password,
        "confPassword": confPassword
      }
      console.log(newUserData)
      const serviceData = {
        method: 'POST',
        url: userApiService + '/user/register',
        data: newUserData,
      };
      return await axios(serviceData);

    } catch (error) {
      return error.response
    }

  }
  async getUsers(email) {
    const serviceData = {
      method: 'GET',
      url: userApiService + '/user/getUsers',
      data: email,
    };
    return await axios(serviceData, config);
  }
  async logout() {
    const serviceData = {
      method: 'DELETE',
      url: userApiService + '/user/logout',
    };
    localStorage.removeItem("refreshToken")
    return await axios(serviceData);
  }
  async refreshToken() {
    try {
      const serviceData = {
        method: 'GET',
        url: userApiService + '/token/refreshToken',
      };
      returnValue = await axios(serviceData);
    }
    catch (error) {
      return error.response
    }
    return returnValue;
  }
  async newCustomer(email) {
    try {
      let newUserData = {
        "email": email,
      }
      const serviceData = {
        method: 'POST',
        url: userApiService + '/customer/newCustomer',
        data: newUserData
      };
      returnValue = await axios(serviceData);
    }
    catch (error) {
      return error.response
    }
    return returnValue;
  }
  async newUser(email, odaName, odaNick) {
    let newUserData = {
      "email": email,
      "odaName": odaName,
      "odaNick": odaNick
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/user/newuser',
      data: newUserData,
    };
    return await axios(serviceData);
  }
  async newOda(odaName) {
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/odaIdentify/newOda',
      data: odaName,
    };
    return await axios(serviceData);
  }
  async isAvailableOdaNick(userData) {
    let odaNickData = {
      "odaNick": userData
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/odaIdentify/isAvailableOdaNick',
      data: odaNickData
    };
    return await axios(serviceData);
  }

  async myOdas(email) {
    let getEmail = {
      "email": email
    }
    console.log("myOdas", getEmail)
    console.log("myOdasToken", token)

    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/user/myOdas',
      data: getEmail
    };
    return await axios(serviceData);
  }

  async getAllCoreographies() {
    const serviceData = userApiService + '/choreography/allcor';
    return await axios.get(serviceData, config);
  }
  async getMyCoreographies(ownerId) {
    let userIdData = {
      "ownerId": ownerId
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/choreography/mycor',
      data: userIdData,
    };
    return await axios(serviceData);
  }
  async getHitsCoreographies() {
    let userData = {
      "limit": 2
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/choreography/hits',
      data: userData,
    };
    return await axios(serviceData);
  }
  async isUserAvailable(email) {
    const userEmail = {
      "email": email
    }
    const serviceData = {
      method: 'POST',
      url: userApiService + '/user/isUserAvailable',
      data: userEmail,
    };
    return await axios(serviceData);
  }
  async createCoreography(name, trackName, file, trackId, ownerId,isShared) {
    const createCorData = {
      name,
      trackName,
      file,
      trackId,
      ownerId,
      isShared,
      "version": "v.1.0"
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/choreography/create',
      data: createCorData,
    };
    return await axios(serviceData);
  }
  async myOdaOnlyEmail({ email }) {
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/user/myOdaOnlyEmail',
      data: { email },
    };
    return await axios(serviceData);
  }
  async liveTry({ odaIP, cor }) {
    var form = new FormData();
    form.append("u", "59");
    form.append("d", cor);
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: `http://${odaIP}:9090/set_dmx`,
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    };

    return await axios(serviceData);
  }
  async getMyEditingCor(corId) {
    let userIdData = {
    corId
    }
    const serviceData = {
      method: 'POST',
      url: userApiService + '/choreography/getEditCor',
      data: userIdData,
    };
    return await axios(serviceData);
  }

  async getMyEditableCors(corId) {
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/choreography/getEditableCors',
    };
    return await axios(serviceData);
  }

  async overwriteCor({corId,file,name}) {
    let userIdData = {
    corId,
    file,
    name
    }
    const serviceData = {
      method: 'POST',
      url: userApiService + '/choreography/overwrite',
      data: userIdData,
    };
    return await axios(serviceData);
  }


  async sendReviews({review, rating, corId}) {
    let ratings = {
      review, rating, corId
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/choreography/addReview',
      data: ratings,
    };
    return await axios(serviceData);
  }
  async readCorReviews({corId}) {
    let ratings = {
      corId
    }
    const serviceData = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      url: userApiService + '/choreography/readCorReviews',
      data: ratings,
    };
    return await axios(serviceData);
  }
}

export default APIServices;
