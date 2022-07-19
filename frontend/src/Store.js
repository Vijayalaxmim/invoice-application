const axios = require("axios");
const API_URL = "http://localhost:9000/invoice";
//var easyinvoice = require("easyinvoice");

class Store {
    static async getInvoiceList() {
        let response = await axios.get(API_URL);
        return response;
    }
    static async updateStatus(id, value) {
        return await axios.put(`${API_URL}/${id}`, { status: value });
    }
    static async generatePdf(rowData) {
        const data = {};
        // const result = await easyinvoice.createInvoice(data);
        console.log(rowData);
        //easyinvoice.download("myInvoice.pdf", result.pdf);
    }
    static async addInvoice(data) {
        let response = await axios.post(API_URL, data);
        console.log("Saved data", response.data);
        return response.data;
    }
}
export default Store;
