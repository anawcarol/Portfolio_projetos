import { supabase } from "@/lib/supabase";

/*
  Repository responsável pelos projetos.
*/

export const projetoRepository = {

  /*
    Busca todos os projetos com skills.
  */
  async findAll() {

    const { data, error } = await supabase
      .from("projetos")
      .select(`
        id,
        titulo,
        descricao,
        data_criacao,
        link,
        profile_id,

        projeto_skills (
          skills (
            id,
            nome
          )
        )
      `);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Busca projeto por ID.
  */
  async findById(id: number) {

    const { data, error } = await supabase
      .from("projetos")
      .select(`
        id,
        titulo,
        descricao,
        data_criacao,
        link,
        profile_id,

        projeto_skills (
          skills (
            id,
            nome
          )
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Cria projeto.
  */
  async create(projeto: {
    titulo: string;
    descricao: string;
    link: string;
    profile_id: number;
  }) {

    const { data, error } = await supabase
      .from("projetos")
      .insert(projeto)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Atualiza projeto.
  */
  async update(
    id: number,
    dados: {
      titulo?: string;
      descricao?: string;
      link?: string;
    }
  ) {

    const { data, error } = await supabase
      .from("projetos")
      .update(dados)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Remove projeto.
  */
  async delete(id: number) {

    const { error } = await supabase
      .from("projetos")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },



  /*
    Relaciona skills ao projeto.
  */
  async attachSkills(
    projetoId: number,
    skillIds: number[]
  ) {

    const relations =
      skillIds.map(skillId => ({
        projeto_id: projetoId,
        skill_id: skillId
      }));



    const { error } = await supabase
      .from("projeto_skills")
      .insert(relations);

    if (error) {
      throw new Error(error.message);
    }
  },



  /*
    Remove todas as skills
    relacionadas ao projeto.
  */
  async clearSkills(projetoId: number) {

    const { error } = await supabase
      .from("projeto_skills")
      .delete()
      .eq("projeto_id", projetoId);

    if (error) {
      throw new Error(error.message);
    }
  }

};