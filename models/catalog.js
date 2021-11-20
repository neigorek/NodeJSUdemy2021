const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Catalog {
    constructor(title, description, price, img) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
        this.id = uuid.v4();
    }

    async save() {
        const catalog = await Catalog.getAll();
        catalog.push(this.toJSON());
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'catalog.json'), JSON.stringify(catalog),
                (err) => {
                if (err) reject(err);
                else resolve()
            })
        })
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'catalog.json'),
                'utf-8',
                ((err, content) => {
                    if (err) reject(err);
                    else {
                        resolve(JSON.parse(content));
                    }
                }))
        })
    }
}

module.exports = Catalog;
