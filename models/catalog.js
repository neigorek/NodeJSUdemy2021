const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const constants = require("constants");

class Catalog {
    constructor(title, description, price, img) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
        this.id = uuid.v4();
    }

    static async update(item) {
        const catalog = await Catalog.getAll();
        const index = catalog.findIndex((i) => i.id === item.id);
        catalog[index] = item;
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'catalog.json'), JSON.stringify(catalog),
                (err) => {
                    if (err) reject(err);
                    else resolve()
                })
        })
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

    static async getById(id) {
        const catalog = await this.getAll();
        return catalog.find(i => i.id === id);
    }
}

module.exports = Catalog;
