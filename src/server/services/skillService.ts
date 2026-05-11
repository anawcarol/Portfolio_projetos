import { skillRepository } from "../repositories/skillRepository";

/*
  Service responsável pelas regras de negócio
  relacionadas às skills.
*/

export const skillService = {

  /*
    Busca todas as skills.
  */
  async getAllSkills() {

    /*
      Apenas delega ao repository.

      Futuramente:
      - ordenação
      - cache
      - filtros
      poderiam ser aplicados aqui.
    */
    return await skillRepository.findAll();
  },



  /*
    Cria nova skill.
  */
  async createSkill(nome: string) {

    /*
      Regra:
      nome obrigatório.
    */
    if (!nome || nome.trim() === "") {
      throw new Error("Nome da skill é obrigatório");
    }



    /*
      Remove espaços desnecessários.
    */
    const nomeFormatado = nome.trim();



    /*
      Busca skills existentes.
    */
    const skills =
      await skillRepository.findAll();



    /*
      Verifica duplicidade.
    */
    const existe = skills.find(
      skill =>
        skill.nome.toLowerCase()
        === nomeFormatado.toLowerCase()
    );

    if (existe) {
      throw new Error("Skill já cadastrada");
    }



    /*
      Repository apenas salva.
    */
    return await skillRepository.create(
      nomeFormatado
    );
  },



  /*
    Atualiza skill.
  */
  async updateSkill(
    id: number,
    nome: string
  ) {

    if (!id) {
      throw new Error("ID inválido");
    }

    if (!nome || nome.trim() === "") {
      throw new Error("Nome obrigatório");
    }



    /*
      Verifica existência.
    */
    const skill =
      await skillRepository.findById(id);

    if (!skill) {
      throw new Error("Skill não encontrada");
    }



    return await skillRepository.update(
      id,
      {
        nome: nome.trim()
      }
    );
  },



  /*
    Remove skill.
  */
  async deleteSkill(id: number) {

    if (!id) {
      throw new Error("ID inválido");
    }



    /*
      Futuramente:
      verificar se está vinculada
      a projetos.
    */

    await skillRepository.delete(id);
  }

};