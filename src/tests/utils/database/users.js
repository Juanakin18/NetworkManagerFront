import db from "mysql2/promise"
class UsersDBTestHelper{
    async addUserTest  (name, email, password  ){
        var sql = "Insert into users (name, email, password) values (?,?,?)";
        var data = [name, email,password];
        sql = db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });
        var [result] = await con.execute(sql, data);
        await con.close();
     }async removeUserTest  (name, email  ){
        var sql = "Delete from users where name=? and email=?";
        var data = [name, email];
        sql = db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });
        var [result] = await con.execute(sql, data);
        await con.close();
     }async addUsers (size  ){
        for(var i =0; i<size; i++){
            await this.addUserTest("usuarioPrueba"+i, "usuarioPrueba"+i+"@prueba.com", "3cadb7fcc5c2c9370de3f8ca7c5ea37110cb7a6d791a241c262ffe72e109a7eb"  );
        }
     }async removeUsers (size  ){
        for(var i =0; i<size; i++){
            await this.removeUserTest("usuarioPrueba"+i, "usuarioPrueba"+i+"@prueba.com"  );
        }
     }async getUser (username  ){
        var sql = "Select * from users where name=? ";
        var data = [username];
        sql = db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });
        var [result, resultColumns] = await con.execute(sql, data);
        await con.close();
        return result[0];

    }
}export default UsersDBTestHelper
