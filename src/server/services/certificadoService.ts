import { certificadoRepository }
from "../repositories/certificadoRepository";

/*
  Service responsável pelas regras
  de negócio relacionadas aos certificados.
*/

export const certificadoService = {

  /*
    Busca certificados do profile.
  */
  async getCertificates(profileId: number) {

    /*
      Regra simples:
      profile_id obrigatório.
    */
    if (!profileId) {
      throw new Error(
        "Profile inválido"
      );
    }



    return await certificadoRepository
      .findByProfile(profileId);
  },



  /*
    Cria certificado.
  */
  async createCertificate(
    nome: string,
    profile_id: number,
    imagem_url?: string
  ) {

    /*
      Regra:
      nome obrigatório.
    */
    if (!nome?.trim()) {
      throw new Error(
        "Nome obrigatório"
      );
    }



    /*
      Regra:
      profile obrigatório.
    */
    if (!profile_id) {
      throw new Error(
        "Profile inválido"
      );
    }



    /*
      Cria certificado.
    */
    return await certificadoRepository.create({
      nome: nome.trim(),
      profile_id,
      imagem_url
    });
  },



  /*
    Atualiza certificado.
  */
  async updateCertificate(
    id: number,
    dados: {
      nome?: string;
    }
  ) {

    /*
      Regra:
      ID obrigatório.
    */
    if (!id) {
      throw new Error(
        "ID inválido"
      );
    }



    /*
      Regra:
      nome não pode ser vazio.
    */
    if (
      dados.nome !== undefined &&
      dados.nome.trim() === ""
    ) {
      throw new Error(
        "Nome inválido"
      );
    }



    /*
      Atualiza certificado.
    */
    return await certificadoRepository.update(
      id,
      {
        nome: dados.nome?.trim()
      }
    );
  },



  /*
    Remove certificado.
  */
  async deleteCertificate(id: number) {

    /*
      Regra:
      ID obrigatório.
    */
    if (!id) {
      throw new Error(
        "ID inválido"
      );
    }



    /*
      Remove certificado.
    */
    await certificadoRepository.delete(id);
  }

};