import { v4 as uuidv4 } from 'uuid';

const date2019 = new Date(2019, 0, 1);
const date2020 = new Date(2020, 0, 1);
const date2021 = new Date(2021, 0, 1);

const products = [
  {
    id: uuidv4(),
    name: 'PlayStation 5',
    description: 'Console da Sony com mídia física',
    price: 4500,
    oldPrice: 5000,
    image: 'https://images.kabum.com.br/produtos/fotos/115737/console-sony-playstation-5_1603798015_g.jpg',
    dateAdded: date2021.toISOString().split('T')[0],
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'Xbox Series S',
    description: 'Xbox com foco em 1080p, cor branco',
    price: 2600,
    oldPrice: 3000,
    image: 'https://images.kabum.com.br/produtos/fotos/128561/console-microsoft-xbox-series-s-500gb-branco-rrs-00006_1601067301_g.jpg',
    dateAdded: new Date(date2021.getFullYear(), date2021.getMonth() + 3, date2021.getDate()).toISOString().split('T')[0],
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'Xbox Series X',
    description: 'Xbox com foco em 4k',
    price: 4500,
    oldPrice: 5000,
    image: 'https://images.kabum.com.br/produtos/fotos/128560/console-microsoft-xbox-series-x-1tb-preto-rrt-00006_1601067024_g.jpg',
    dateAdded: date2020.toISOString().split('T')[0],
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'Galaxy S20+',
    description: 'Samsung Galaxy S20+ com 256GB na cor azul',
    price: 4800,
    oldPrice: 5200,
    image: 'https://sipolatti.vteximg.com.br/arquivos/ids/174518-550-570/SAMSUNG-GALAXY-S20-PLUS-Cloud-Blue.jpg?v=637227295037370000',
    dateAdded: new Date(date2020.getFullYear(), date2020.getMonth() + 3, date2020.getDate()).toISOString().split('T')[0],
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'Galaxy S20 FE',
    description: 'Samsung Galaxy Fan Edition 128GB',
    price: 2500,
    oldPrice: 2800,
    image: 'https://a-static.mlcdn.com.br/1500x1500/smartphone-samsung-galaxy-s20-fe-128gb-cloud-navy-4g-6gb-ram-tela-65-cam-tripla-selfie-32mp/magazineluiza/155629800/0007bbdc665749ec107d860c3a4b8b2f.jpg',
    dateAdded: new Date(date2019.getFullYear(), date2019.getMonth() + 3, date2019.getDate()).toISOString().split('T')[0],
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'iPhone 12 mini',
    description: 'Apple iPhone mini 128GB cor preta',
    price: 3800,
    oldPrice: 4000,
    image: 'https://www.techinn.com/f/13782/137821889/apple-iphone-12-mini-4gb-128gb-5.4.jpg',
    dateAdded: date2019.toISOString().split('T')[0],
    quantity: 1,
  }
].map(product => ({
  ...product
}));

export { products };
