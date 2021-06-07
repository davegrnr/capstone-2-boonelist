import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class BoonelistApi {
// the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BoonelistApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
        return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
        }
        }

    /** Individual API routes -->
     */

        // Get current user

        static async getCurrentUser(username) {
            let res = await this.request(`users/${username}`);
            return res.user;
        }

        // Signup with user data input

        static async signup(data) {
            let res = await this.request(`auth/register`, data, "post");
            return res.token
        }

        // Log user in from form data

        static async login(data) {
            let res = await this.request(`auth/login`, data, "post");
            return res.token;
        }

        // log user in and assign token

        static async login(data) {
            let res = await this.request(`auth/token`, data, "post");
            return res.token;
        }

        static async getServices(title){
            let res = await this.request(`services`, { title })
            return res.services
        }

        static async getSales(itemName){
            let res = await this.request(`sales`, { itemName })
            return res.sales
        }

}

// BoonelistApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyMjcyNTg0Mn0.nJsOKBaufn81VX7rL70oev_KemBmKE5sSwk6S3Ax_wk"

export default BoonelistApi