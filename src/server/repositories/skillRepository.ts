import { supabase } from "@/lib/supabase";

/*
  Repository responsável SOMENTE pela tabela "skills".

  Ele:
  - busca skills
  - cria skills
  - atualiza skills
  - remove skills

  Ele NÃO:
  - valida regra de negócio
  - verifica autenticação
  - decide fluxo do sistema
*/

export const skillRepository = {

  /*
    Busca todas as skills.
  */
  async findAll() {

    const { data, error } = await supabase
      .from("skills")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Busca uma skill pelo ID.
  */
  async findById(id: number) {

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Cria uma nova skill.
  */
  async create(nome: string) {

    const { data, error } = await supabase
      .from("skills")
      .insert({
        nome
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Atualiza uma skill existente.
  */
  async update(
    id: number,
    dados: {
      nome?: string;
    }
  ) {

    const { data, error } = await supabase
      .from("skills")
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
    Remove uma skill pelo ID.
  */
  async delete(id: number) {

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

};