import { perfilRepository }
  from "../repositories/perfilRepository";

/*
  Service responsável pelas regras
  de negócio relacionadas ao profile.
*/

export const perfilService = {

  /*
    Busca profile principal.
  */
  async getProfile() {

    return await perfilRepository.getProfile();
  },



  /*
    Cria profile único do sistema.
  */
  async createProfile(data: {
    nome: string;
    descricao?: string;
    foto_perfil: string;
  }) {

    /*
      Regra:
      nome obrigatório.
    */
    if (!data.nome?.trim()) {
      throw new Error(
        "Nome obrigatório"
      );
    }

    if (!data.foto_perfil?.trim()) {
      throw new Error(
        "Foto obrigatória"
      );
    }



    /*
      REGRA MAIS IMPORTANTE:

      Só pode existir um profile.
    */

    let profileExistente = null;

    try {

      /*
        Tentamos buscar profile existente.
      */
      profileExistente =
        await perfilRepository.getProfile();

    } catch {

      /*
        Se não existir profile,
        ignoramos erro.
      */
    }



    /*
      Se já existir,
      bloqueamos criação.
    */
    if (profileExistente) {
      throw new Error(
        "Já existe um profile cadastrado"
      );
    }



    /*
      Cria profile.
    */
    return await perfilRepository.create({
      nome: data.nome.trim(),

      descricao:
        data.descricao?.trim(),

      foto_perfil:
        data.foto_perfil.trim()
    });

  },



  /*
    Atualiza profile.
  */
  async updateProfile(
    id: number,
    dados: {
      nome?: string;
      descricao?: string;
      foto_perfil?: string;
    }
  ) {

    if (!id) {
      throw new Error(
        "ID inválido"
      );
    }



    if (
      dados.nome &&
      dados.nome.trim() === ""
    ) {
      throw new Error(
        "Nome inválido"
      );
    }



    /*
      Verifica existência.
    */
    const profile =
      await perfilRepository.getProfile();

    if (!profile) {
      throw new Error(
        "Profile não encontrado"
      );
    }



    return await perfilRepository.update(
      id,
      {
        nome: dados.nome?.trim(),
        descricao:
          dados.descricao?.trim()
      }
    );
  }

};