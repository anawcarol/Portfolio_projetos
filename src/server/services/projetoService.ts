import { projetoRepository }
from "../repositories/projetoRepository";

import { skillRepository }
from "../repositories/skillRepository";

/*
  Service responsável pelos projetos.
*/

export const projetoService = {

  /*
    Lista projetos com skills.
  */
  async getAllProjects() {

    return await projetoRepository.findAll();
  },



  /*
    Cria projeto.
  */
  async createProject(data: {
    titulo: string;
    descricao: string;
    profile_id: number;
    skillIds: number[];
  }) {

    /*
      Regra:
      título obrigatório.
    */
    if (!data.titulo?.trim()) {
      throw new Error("Título obrigatório");
    }



    /*
      Regra:
      descrição obrigatória.
    */
    if (!data.descricao?.trim()) {
      throw new Error("Descrição obrigatória");
    }



    /*
      Regra:
      projeto deve possuir skills.
    */
    if (
      !data.skillIds ||
      data.skillIds.length === 0
    ) {
      throw new Error(
        "Projeto deve possuir ao menos uma skill"
      );
    }



    /*
      Valida existência das skills.
    */
    for (const skillId of data.skillIds) {

      const skill =
        await skillRepository.findById(skillId);

      if (!skill) {
        throw new Error(
          `Skill ${skillId} não encontrada`
        );
      }
    }



    /*
      Cria projeto.
    */
    const projeto =
      await projetoRepository.create({
        titulo: data.titulo.trim(),
        descricao: data.descricao.trim(),
        profile_id: data.profile_id
      });



    /*
      Relaciona skills.
    */
    await projetoRepository.attachSkills(
      projeto.id,
      data.skillIds
    );



    return projeto;
  }

};