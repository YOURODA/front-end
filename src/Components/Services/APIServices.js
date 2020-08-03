import axios from 'axios';
import { Local_API, Prod_API } from '../Config/Env';

class APIServices {

    async newUser(userData) {
        const serviceData = {
            method: 'POST',
            url: Local_API + '/user/newuser',
            data: userData,
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

    async getMyCoreographies() {
        const serviceData = Local_API + '/choreography/mycor';
        return await axios.get(serviceData);
    }

    async createCoreography(corData) {
        const serviceData = {
            method: 'POST',
            url: Local_API + '/choreography/create',
            data: corData,
        };
        return await axios(serviceData);
    }

}

export default APIServices;
