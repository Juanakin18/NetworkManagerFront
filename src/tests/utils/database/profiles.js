const db = require("mysql2/promise");
class ProfilesDBTestHelper{

    async addProfileTest(user, socialMedia, profile){
        var sql = "Insert into profiles (user, socialMedia, profile) values (?,?,?)";
        var data = [user, socialMedia, profile];
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
    }

     async removeProfileTest (user,socialMedia, profile){
        var sql = "delete from profiles where user = ? and socialMedia = ? and profile=? ";
        var data = [user,socialMedia, profile];
        sql = db.format(sql, data);

         var con = await db.createConnection({
             host: "localhost",
             user: "root",
             password: "Zw3i,H4nd3r",
             database: "networkmanager"
         });

         var [result] = await con.execute(sql, data);
         await con.close();
    }
    async getProfilesFromUserTest(user){
        var sql = "select * from profiles where user = ? or user=?";
        var data = [user, user+"@prueba.com"];
        sql =db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });

        var [profiles, profilesFields] = await con.execute(sql, data);
        console.log("Datos:" + profiles)
        await con.close();
        return profiles;
    }
    async addProfilesToUser(user, size){
        for(var i =0; i<size; i++){
            var socialMedia = "reddit";
            if(i%2==0)
                socialMedia ="bluesky";
            await this.addProfileTest(user+"@prueba.com", "reddit", "profile"+i);
        }
    }
    async removeAllProfilesForUser (user){
        var sql = "delete from profiles where user = ? or user=? ";
        var data = [user, user+"@prueba.com"];
        sql = db.format(sql, data);

        var con = await db.createConnection({
            host: "localhost",
            user: "root",
            password: "Zw3i,H4nd3r",
            database: "networkmanager"
        });

        var [result] = await con.execute(sql, data);
        await con.close();
    }
}export default ProfilesDBTestHelper