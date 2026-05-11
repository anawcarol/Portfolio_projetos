import { projetoService }
from "@/server/services/projetoService";

/*
  GET /api/projetos

  Lista projetos com skills.
*/
export async function GET() {

  try {

    const projetos =
      await projetoService.getAllProjects();

    return Response.json(projetos);

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
  POST /api/projetos

  Cria projeto.
*/
export async function POST(req: Request) {

  try {

    /*
      Lê body JSON.
    */
    const body = await req.json();



    /*
      Cria projeto e relaciona skills.
    */
    const projeto =
      await projetoService.createProject({
        titulo: body.titulo,
        descricao: body.descricao,
        profile_id: body.profile_id,
        skillIds: body.skillIds
      });



    return Response.json(projeto);

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