/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('productos').del()
  await knex('productos').insert([
    {
      "name": "cbd",
      "price": "10",
      "id": 1
    },
    {
      "name": "cbd",
      "price": "10",
      "id": 2
    },
    {
      "name": "thc",
      "price": "1",
      "id": 3
    },
    {
      "name": "thcGummies3",
      "price": "2200",
      "id": 4
    },
    {
      "name": "thcGummies3",
      "price": "2200",
      "id": 5
    },
    {
      "name": "Gummies EXXXtra Strong",
      "price": 18500,
      "id": 7
    }
  ]);
};
