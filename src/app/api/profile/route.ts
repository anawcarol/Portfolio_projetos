import { perfilService }
from "@/server/services/perfilService";

/*
  GET /api/profile

  Busca profile principal.
*/
export async function GET() {

  try {

    const profile =
      await perfilService.getProfile();

    return Response.json(profile);

  } catch (error: any) {

    return Response.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }

}



/*
  POST /api/profile

  Cria profile único.
*/
export async function POST(req: Request) {

  try {

    /*
      Lê body JSON.
    */
    const body = await req.json();



    /*
      Service garante unicidade.
    */
    const profile =
      await perfilService.createProfile({
        nome: body.nome,
        descricao: body.descricao
      });



    return Response.json(profile);

  } catch (error: any) {

    return Response.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }

}



/*
  PUT /api/profile?id=1

  Atualiza profile.
*/
export async function PUT(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const id =
      Number(searchParams.get("id"));



    const body = await req.json();



    const profile =
      await perfilService.updateProfile(
        id,
        {
          nome: body.nome,
          descricao: body.descricao
        }
      );



    return Response.json(profile);

  } catch (error: any) {

    return Response.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }

}