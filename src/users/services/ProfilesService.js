class ProfilesService{
    constructor(repository) {
        this.repository = repository;
    }

    async addProfile(profileDTO){
        var result = await this.repository.addProfile(profileDTO);
        if(result.result == "SUCCESS")
            return "SUCCESS";
        return "FAILIURE";
    }


}export default ProfilesService;