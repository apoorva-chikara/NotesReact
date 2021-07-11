/**
 * HTTP lib import
 */
import axios from "axios";

/**
 * Constant Imports
 */
import URLConstant from "../../constants/url.constants";


/**
 * the methods inside the saveNote helps
 * to update the note details and save the new notes
 * to the DB
 */
const saveNote = {
    saveNote : async (note) => {
        try {
            const URL = `${URLConstant.baseURL}save`
            const response = await axios.post(URL, {data: note});
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
    udpateNote: async (note) => {
        try {
            const URL = `${URLConstant.baseURL}update`;
            const response = await axios.post(URL, {data: note});
            console.log(response);
        } catch (error) {
            console.log(error);
        } 
    }
}

export default saveNote;