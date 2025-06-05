import db from "mysql2/promise"
class TFADBTestHelper{
    async getNumberFromUser (user){
        var sql = "select * from tfa_info where userLogin=?";
        var data = [user];
        sql = db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });
        var [users, usersFields] = await con.execute(sql, data);
        console.log("Se han leído:" + users)
        await con.close();
        return users[0].number;
     }async addNumberToUser (user, number){
        var sql = "Insert into tfa_info (userLogin, number) values (?,?)";
        var data = [user, number];
        sql = db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });
        var [result] = await con.execute(sql, data);
        await con.close();
        console.log("Insertado:" + result)

     }async removeNumberForUser(user){
        var sql = "Delete from tfa_info where userLogin = ?";
        var data = [user];
        sql =db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });
        var [result] = await con.execute(sql, data);
        await con.close();
        console.log("Borrado:" + result)
    }
}export default TFADBTestHelper;