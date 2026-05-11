import { certificadoService }
from "@/server/services/certificadoService";

/*
  GET /api/certificados?profileId=1

  Busca certificados do profile.
*/
export async function GET(req: Request) {

  try {

    /*
      Obtém parâmetros da URL.
    */
    const { searchParams } =
      new URL(req.url);

    const profileId =
      Number(searchParams.get("profileId"));



    const certificados =
      await certificadoService
        .getCertificates(profileId);



    return Response.json(certificados);

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
  POST /api/certificados

  Cria certificado.
*/
export async function POST(req: Request) {

  try {

    const body = await req.json();



    const certificado =
      await certificadoService
        .createCertificate(
          body.nome,
          body.profile_id
        );



    return Response.json(certificado);

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
  PUT /api/certificados?id=1

  Atualiza certificado.
*/
export async function PUT(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const id =
      Number(searchParams.get("id"));



    const body = await req.json();



    const certificado =
      await certificadoService
        .updateCertificate(
          id,
          {
            nome: body.nome
          }
        );



    return Response.json(certificado);

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
  DELETE /api/certificados?id=1

  Remove certificado.
*/
export async function DELETE(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const id =
      Number(searchParams.get("id"));



    await certificadoService
      .deleteCertificate(id);



    return Response.json({
      message:
        "Certificado removido com sucesso"
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