class PostsService{
    constructor(profilesService, postsRepository, usersService) {
        this.profilesService = profilesService;
        this.postsRepository = postsRepository;
        this.usersService = usersService;
    }

    async postMultiple(postInfo, perfiles){
        for (const perfil in perfiles) {
            await this.post(postInfo, perfil);
        }
    }

    async post(postInfo, perfil){
        //Obtener tokens
        var tokens = this.profilesService.getToken(this.usersService.getLoggedUser(), perfil.redSocial, perfil.nombre);
        //Llamar a la api
        var result = this.postsRepository.post(postInfo, tokens);

        //HA SALIDO BIEN
        //Nada
        if(result.result=="SUCCESS")
            return {
                result:"SUCCESS"
            }
        else
            return {
                result:"FAILIURE"
            }
        //HA SALIDO MAL
        //Excepción
    }
}
export default PostsService;