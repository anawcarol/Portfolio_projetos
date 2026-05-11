import { supabase } from "@/lib/supabase";

/*
  Repository responsável pelos projetos.

  Aqui já temos:
  - relacionamento projeto ↔ skills
  - joins
  - inserts múltiplos
*/

export const projetoRepository = {

  /*
    Busca projetos com suas skills.
  */
  async findAll() {

    /*
      O Supabase permite joins automáticos
      usando relações do banco.
    */

    const { data, error } = await supabase
      .from("projetos")
      .select(`
        id,
        titulo,
        descricao,
        data_criacao,

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
    Cria um projeto.
  */
  async create(projeto: {
    titulo: string;
    descricao: string;
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
    Relaciona skills ao projeto.

    Isso popula:
    projeto_skills
  */
  async attachSkills(
    projetoId: number,
    skillIds: number[]
  ) {

    /*
      Transformamos:
      [1, 2, 3]

      em:

      [
        { projeto_id: 1, skill_id: 1 },
        { projeto_id: 1, skill_id: 2 },
        { projeto_id: 1, skill_id: 3 }
      ]
    */

    const relations = skillIds.map(skillId => ({
      projeto_id: projetoId,
      skill_id: skillId
    }));



    /*
      INSERT em massa.
    */
    const { error } = await supabase
      .from("projeto_skills")
      .insert(relations);

    if (error) {
      throw new Error(error.message);
    }
  }

};