'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async up(queryInterface) {
    await queryInterface.bulkInsert('invoices', [
      {
        name: 'invoice template 1',
        preview:
          'https://media.vogue.co.uk/photos/641334a69e8c9ff70cd2ebb4/master/pass/British%20Vogue%20x%20Central%20Cee%20-%20HIGH%20RES%20FINALS_2.jpg',
        invoice: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>{{title}}</title>
          </head>
          <body>
            <h1>{{heading}}</h1>
            <p>{{message}}</p>
            <ul>
              {{#each items}}
                <li>{{this}}</li>
              {{/each}}
            </ul>
          </body>
        </html>`,
        active: true,
        uuid: uuid.v4(),
      },
      {
        name: 'invoice template 2',
        preview:
          'https://media.vogue.co.uk/photos/641334a69e8c9ff70cd2ebb4/master/pass/British%20Vogue%20x%20Central%20Cee%20-%20HIGH%20RES%20FINALS_2.jpg',
        invoice: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>{{title}}</title>
          </head>
          <body>
            <h1>{{heading}}</h1>
            <p>{{message}}</p>
            <ul>
              {{#each items}}
                <li>{{this}}</li>
              {{/each}}
            </ul>
          </body>
        </html>`,
        active: true,
        uuid: uuid.v4(),
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {});
  },
};
