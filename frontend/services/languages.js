import baseAPI from './api';
import baseURLs from '../configs/baseURLs';

class LanguagesService{
    constructor (){
        this.api = baseAPI(baseURLs.API_LANGUAGES)
    }

    async languages() {
        const result = await this.api.get('languages');

        return result;
    }
}

export default LanguagesService;