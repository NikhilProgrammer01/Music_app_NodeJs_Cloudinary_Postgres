const pool = require("../config/db");

const getSongsByName = async (name) => {
  const query = `
  SELECT * FROM songs 
  WHERE title ILIKE '%' || $1 || '%'
  ORDER BY title ASC
`;
const result = await pool.query(query, [name]); // Remove `%`

  return result.rows;
};

module.exports = { getSongsByName };
