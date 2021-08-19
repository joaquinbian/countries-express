require("dotenv").config();

const { PORT } = process.env;

const { default: fetch } = require("node-fetch");
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  // fetch(URL_ALL)
  // .then(rta => rta.json())
  // .then(countries=>{

  //   countries.forEach((c)=>{
  //     Country.create({
  //         id:c.alpha3Code,
  //         name:c.name,
  //         flag:c.flag,
  //         continent:c.region,
  //         capital:c.capital,
  //         subregion:c.subregion,
  //         area:c.area,
  //         population:c.population
  //     })

  //   })
  // })
  server.listen(PORT, () => {
    console.log(`app listening at ${PORT}`); // eslint-disable-line no-console
  });
});
