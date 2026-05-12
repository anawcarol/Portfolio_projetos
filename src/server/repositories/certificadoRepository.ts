import { supabase } from "@/lib/supabase";


export const certificadoRepository = {

  /*
    Busca certificados de um profile.
  */
  async findByProfile(profileId: number) {

    const { data, error } = await supabase
      .from("certificados")
      .select("*")
      .eq("profile_id", profileId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Cria um novo certificado.
  */
  async create(certificado: {
    nome: string;
    profile_id: number;
    imagem_url?: string;
  }) {

    const { data, error } = await supabase
      .from("certificados")
      .insert(certificado)

      /*
        Retorna o registro criado.
      */
      .select()

      /*
        Esperamos apenas 1 resultado.
      */
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Atualiza um certificado existente.
  */
  async update(
    id: number,
    dados: {
      nome?: string;
      imagem_url?: string;
    }
  ) {

    const { data, error } = await supabase
      .from("certificados")

      /*
        UPDATE certificados SET ...
      */
      .update(dados)

      /*
        WHERE id = ...
      */
      .eq("id", id)

      /*
        Retorna o registro atualizado.
      */
      .select()

      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },



  /*
    Remove um certificado.
  */
  async delete(id: number) {

    const { error } = await supabase
      .from("certificados")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

};