import type { RoomModel } from '$/commonTypesWithClient/models';
import { handlerrepository } from '$/repository/handlerrepository';
import assert from 'assert';

export const handlerusecase = {
  create: async (userId: string) => {
    const newRoom: RoomModel = {
      Id: userId,
      position: { x: 0, y: 0 },
      // isFiring: false,
    };
    await handlerrepository.save(newRoom);
    console.log('newgame');
    return newRoom;
  },
  operateXY: async (position: { x: number; y: number }, key: string, userId: string) => {
    const label = userId;
    console.log(position);
    console.log(userId);
    console.log(label);
    const latest = await handlerrepository.findLatest(label);
    assert(latest);
    console.log(latest);
    if (key === '-Y') {
      position.y -= 1;
      latest.position.y = position.y;
    } else if (key === '+Y') {
      position.y += 1;
      latest.position.y = position.y;
    } else if (key === '-X') {
      position.x -= 1;
      latest.position.x = position.x;
    } else if (key === '+X') {
      position.x += 1;
      latest.position.x = position.x;
    }
    // if (key === 'ArrowUp') {
    //   position.y += 1;
    //   latest.position.y = position.y;
    // } else if (key === 'ArrowDown') {
    //   position.y -= 1;
    //   latest.position.y = position.y;
    // } else if (key === 'ArrowLeft') {
    //   position.x -= 1;
    //   latest.position.x = position.x;
    // } else if (key === 'ArrowRight') {
    //   position.x += 1;
    //   latest.position.x = position.x;
    // }

    await handlerrepository.save(latest);
    return latest;
  },
};
