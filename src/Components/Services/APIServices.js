import axios from 'axios';
import { Local_API, Prod_API } from '../Config/Env';

class APIServices {
  async newUser(email, odaName, odaNick) {
    let newUserData = {
      "email": email,
      "odaName": odaName,
      "odaNick": odaNick
    }
    const serviceData = {
      method: 'POST',
      url: Local_API + '/user/newuser',
      data: newUserData,
    };
    return await axios(serviceData);
  }
  async newOda(odaName) {
    const serviceData = {
      method: 'POST',
      url: Local_API + '/odaIdentify/newOda',
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
      url: Local_API + '/odaIdentify/isAvailableOdaNick',
      data: odaNickData
    };
    return await axios(serviceData);
  }

  async myOdas(email) {
    const serviceData = {
      method: 'GET',
      url: Local_API + '/user/myOdas',
      data: email,
    };
    return await axios(serviceData);
  }

  async getAllCoreographies() {
    const serviceData = Local_API + '/choreography/allcor';
    return await axios.get(serviceData);
  }

  // async getMyCoreographies() {
  //     const serviceData = Local_API + '/choreography/mycor';
  //     return await axios.get(serviceData);
  // }
  async getMyCoreographies(ownerId) {
    const serviceData = {
      method: 'POST',
      url: Local_API + '/choreography/mycor',
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
      url: Local_API + '/user/isUserAvailable',
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
      url: Local_API + '/choreography/create',
      data: createCorData,
    };
    return await axios(serviceData);
  }
}

export default APIServices;
