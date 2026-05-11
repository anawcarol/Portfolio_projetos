import { supabase } from "@/lib/supabase";

/*
  Repository responsável pela tabela "profiles".

  Como o sistema terá apenas um profile,
  trabalhamos com:
  - getProfile()
  ao invés de:
  - findById()
*/

export const perfilRepository = {

  /*
    Busca o profile principal do sistema.

    Como existe apenas um,
    usamos .single()
  */
  async getProfile() {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();

    /*
      Se houver erro,
      interrompemos.
    */
    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Cria o profile.

    Provavelmente será usado apenas uma vez,
    no setup inicial.
  */
  async create(profile: {
    nome: string;
    descricao?: string;
  }) {

    const { data, error } = await supabase
      .from("profiles")
      .insert(profile)

      /*
        Retorna o registro criado.
      */
      .select()

      /*
        Esperamos apenas um.
      */
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Atualiza o profile principal.
  */
  async update(
    id: number,
    dados: {
      nome?: string;
      descricao?: string;
    }
  ) {

    const { data, error } = await supabase
      .from("profiles")

      /*
        UPDATE profiles SET ...
      */
      .update(dados)

      /*
        WHERE id = ...
      */
      .eq("id", id)

      /*
        Retorna atualizado.
      */
      .select()

      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Remove profile.

    Talvez você nunca use isso,
    mas deixamos disponível.
  */
  async delete(id: number) {

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

};