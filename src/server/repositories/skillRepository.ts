import { supabase } from "@/lib/supabase";

/*
  Repository responsável SOMENTE
  pela tabela "skills".
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
    Busca skill pelo ID.
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
    Cria nova skill.
  */
  async create(skill: {
    nome: string;
    icon: string;
  }) {

    const { data, error } = await supabase
      .from("skills")
      .insert(skill)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Atualiza skill.
  */
  async update(
    id: number,
    dados: {
      nome?: string;
      icon?: string;
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
    Remove skill.
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