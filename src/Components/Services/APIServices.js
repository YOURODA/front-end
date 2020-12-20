import axios from 'axios';
import { Local_API, Prod_API } from '../Config/Env';

const userApiService = Prod_API

class APIServices {
  async newUser(email, odaName, odaNick) {
    let newUserData = {
      "email": email,
      "odaName": odaName,
      "odaNick": odaNick
    }
    const serviceData = {
      method: 'POST',
      url: userApiService + '/user/newuser',
      data: newUserData,
    };
    return await axios(serviceData);
  }
  async newOda(odaName) {
    const serviceData = {
      method: 'POST',
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
      url: userApiService + '/odaIdentify/isAvailableOdaNick',
      data: odaNickData
    };
    return await axios(serviceData);
  }

  async myOdas(email) {
    const serviceData = {
      method: 'GET',
      url: userApiService + '/user/myOdas',
      data: email,
    };
    return await axios(serviceData);
  }

  async getAllCoreographies() {
    const serviceData = userApiService + '/choreography/allcor';
    return await axios.get(serviceData);
  }

  // async getMyCoreographies() {
  //     const serviceData = userApiService + '/choreography/mycor';
  //     return await axios.get(serviceData);
  // }
  async getMyCoreographies(ownerId) {
    const serviceData = {
      method: 'POST',
      url: userApiService + '/choreography/mycor',
      data: ownerId,
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
  async createCoreography(name, trackName, file, trackId, ownerId) {
    console.log("createCoreography", name, trackName, file, trackId, ownerId)
    const createCorData = {
      "name": name,
      "trackName": trackName,
      "file": file,
      "trackId": trackId,
      "ownerId": ownerId,
    }

    const serviceData = {
      method: 'POST',
      url: userApiService + '/choreography/create',
      data: createCorData,
    };
    return await axios(serviceData);
  }
}

export default APIServices;
