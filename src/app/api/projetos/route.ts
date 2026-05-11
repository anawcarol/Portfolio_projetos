import { projetoRepository } from "@/server/repositories/projetoRepository";

export async function GET() {

  try {

    const projeto = await projetoRepository.findAll();

    return Response.json(projeto);

  } catch (error: any) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }

}