const amazonScraper  = require('amazon-buddy')



const result = async(str) => {
    try {
        const response = await amazonScraper.products({keyword :str ,number:10});
        return response.result;
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = result;