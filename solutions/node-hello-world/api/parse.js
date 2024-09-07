// api/parse.js
const axios = require('axios');
const { JSDOM } = require('jsdom');

module.exports = async (req, res) => {
    const { url, element } = req.query;

    if (!url || !element) {
        return res.status(400).send("Пожалуйста, введите URL сайта и элемент для парсинга.");
    }

    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const elements = dom.window.document.querySelectorAll(element);

        if (elements.length > 0) {
            const results = Array.from(elements).map(el => el.outerHTML).join('<br>');
            res.send(results);
        } else {
            res.send("Элементы не найдены.");
        }
    } catch (error) {
        res.status(500).send("Ошибка при получении страницы. Проверьте правильность URL.");
    }
};
