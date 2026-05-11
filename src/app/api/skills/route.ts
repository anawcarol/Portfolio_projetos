import { skillRepository } from "@/server/repositories/skillRepository";

export async function GET() {

  try {

    const skills = await skillRepository.findAll();

    return Response.json(skills);

  } catch (error: any) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }

}