import { skillService }
from "@/server/services/skillService";

/*
  GET /api/skills

  Busca todas as skills.
*/
export async function GET() {

  try {

    const skills =
      await skillService.getAllSkills();

    return Response.json(skills);

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
  POST /api/skills

  Cria nova skill.
*/
export async function POST(req: Request) {

  try {

    /*
      Lê body JSON.
    */
    const body = await req.json();



    /*
      Service executa regras de negócio.
    */
    const skill =
      await skillService.createSkill(
        body.nome
      );



    return Response.json(skill);

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
  PUT /api/skills?id=1

  Atualiza skill.
*/
export async function PUT(req: Request) {

  try {

    /*
      Obtém parâmetros da URL.
    */
    const { searchParams } =
      new URL(req.url);

    const id =
      Number(searchParams.get("id"));



    /*
      Lê body JSON.
    */
    const body = await req.json();



    /*
      Service aplica validações.
    */
    const skill =
      await skillService.updateSkill(
        id,
        body.nome
      );



    return Response.json(skill);

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
  DELETE /api/skills?id=1

  Remove skill.
*/
export async function DELETE(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const id =
      Number(searchParams.get("id"));



    await skillService.deleteSkill(id);



    return Response.json({
      message:
        "Skill removida com sucesso"
    });

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