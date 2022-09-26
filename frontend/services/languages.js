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

    async add(languageModel) {
        const result = await this.api.post(`languages`, languageModel);

        return result;
    }

    async delete(id) {
        const result = await this.api.delete(`languages/${id}`);

        return result;
    }
}

export default LanguagesService;