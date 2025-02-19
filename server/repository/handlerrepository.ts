import type { RoomModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { game } from '@prisma/client';
import { z } from 'zod';

const toGameModel = (prismaRoom: game): RoomModel => ({
  Id: userIdParser.parse(prismaRoom.firebaseId),
  position: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaRoom.position),
  // isFiring: false,
});

export const handlerrepository = {
  save: async (game: RoomModel) => {
    await prismaClient.game.upsert({
      where: { firebaseId: game.Id },
      update: { position: game.position },
      create: { firebaseId: game.Id, position: game.position },
    });
  },
  findLatest: async (label: string | undefined): Promise<RoomModel | undefined> => {
    const gamelist = await prismaClient.game.findMany();
    console.log(gamelist);
    const rooms = gamelist.find((game) => game.firebaseId === label);
    return rooms !== undefined ? toGameModel(rooms) : undefined;
  },
};
