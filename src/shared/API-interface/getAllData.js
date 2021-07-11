/**
 * HTTP lib import
 */
import axios from 'axios';

/**
 * Constant Imports
 */
import URLConstant from '../../constants/url.constants';

/**
 * the method inside the getAllData helps
 * to get all the notes detail and later we can add 
 * new methods to get notes based on id too
 */
const getAllData = {
       getData: async() => {
        const URL = `${URLConstant.baseURL}getall`;
        const { data: allNotes }  = await axios.get(URL);
        return allNotes;
       }
}

export default getAllData;