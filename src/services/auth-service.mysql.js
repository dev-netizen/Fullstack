module.exports.authQueries = {
  getUser: `
                SELECT  id,
                        name,
                        lastName,
                        email,
                        password,
                        isActive
                FROM    user
                WHERE   email     = ?
    `,
  createUser: `
                INSERT INTO user (
                                    name,
                                    lastName,
                                    email,
                                    password
                )
                VALUES            (
                                    ?,
                                    ?,
                                    ?,
                                    ?
                )
  `,
};
