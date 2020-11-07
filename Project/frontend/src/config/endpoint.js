class Endpoint {
    static API_TOKEN = '';
    BASE_URL = "http://localhost:4000";

    buildReqHeader(type, data) {
        return {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ Endpoint.API_TOKEN }`
            },
            body: JSON.stringify(data)
        }
    }

    async login(data) {
        const response = await fetch(`${ this.BASE_URL }/login`, this.buildReqHeader('POST', data));
        const loginResponse = await response.json();
        Endpoint.API_TOKEN = loginResponse.token;
        return loginResponse;
    }

    async register(data) {
        const response = await fetch(`${ this.BASE_URL }/register`, this.buildReqHeader('POST', data));
        const registerResponse = await response.json();
        return registerResponse;
    }
}

export default new Endpoint();
