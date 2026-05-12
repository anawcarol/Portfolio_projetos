import { projetoRepository }
  from "../repositories/projetoRepository";

import { skillRepository }
  from "../repositories/skillRepository";

/*
  Service responsável pelos projetos.
*/

export const projetoService = {

  /*
    Lista projetos.
  */
  async getAllProjects() {

    return await projetoRepository.findAll();
  },



  /*
    Busca projeto por ID.
  */
  async getProjectById(id: number) {

    if (!id) {
      throw new Error("ID inválido");
    }

    return await projetoRepository.findById(id);
  },



  /*
    Cria projeto.
  */
  async createProject(data: {
    titulo: string;
    descricao: string;
    link: string;
    profile_id: number;
    skillIds: number[];
  }) {

    /*
      Título obrigatório.
    */
    if (!data.titulo?.trim()) {
      throw new Error(
        "Título obrigatório"
      );
    }



    /*
      Descrição obrigatória.
    */
    if (!data.descricao?.trim()) {
      throw new Error(
        "Descrição obrigatória"
      );
    }



    /*
      Link obrigatório.
    */
    if (!data.link?.trim()) {
      throw new Error(
        "Link obrigatório"
      );
    }



    /*
      Projeto deve possuir skills.
    */
    if (
      !data.skillIds ||
      data.skillIds.length === 0
    ) {
      throw new Error(
        "Projeto deve possuir skills"
      );
    }



    /*
      Valida skills.
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
        profile_id: data.profile_id,
        link: data.link.trim()
      });



    /*
      Vincula skills.
    */
    await projetoRepository.attachSkills(
      projeto.id,
      data.skillIds
    );



    return projeto;
  },



  /*
    Atualiza projeto.
  */
  async updateProject(
    id: number,
    data: {
      titulo?: string;
      descricao?: string;
      skillIds?: number[];
    }
  ) {

    if (!id) {
      throw new Error("ID inválido");
    }



    /*
      Verifica existência.
    */
    const projeto =
      await projetoRepository.findById(id);

    if (!projeto) {
      throw new Error(
        "Projeto não encontrado"
      );
    }



    /*
      Atualiza projeto.
    */
    const projetoAtualizado =
      await projetoRepository.update(
        id,
        {
          titulo: data.titulo?.trim(),
          descricao: data.descricao?.trim()
        }
      );



    /*
      Atualiza skills.
    */
    if (data.skillIds) {

      /*
        Remove relações antigas.
      */
      await projetoRepository.clearSkills(id);



      /*
        Cria novas relações.
      */
      await projetoRepository.attachSkills(
        id,
        data.skillIds
      );
    }



    return projetoAtualizado;
  },



  /*
    Remove projeto.
  */
  async deleteProject(id: number) {

    if (!id) {
      throw new Error("ID inválido");
    }

    await projetoRepository.delete(id);
  }

};