"use client";

//import { auth } from "@/server/auth";
// import { signout } from "../actions/auth";
//import { db } from "@/server/db";
import UserMenu from "@/components/dashboard/UserMenu";
import Canvas from "@/components/canvas/Canvas";

export default function Page() {
  // const session = await auth();

  // const user = await db.user.findUniqueOrThrow({
  //   where: {
  //     id: session?.user.id,
  //   },
  //   include: {
  //     ownedRooms: true,
  //     roomInvites: {
  //       include: {
  //         room: true,
  //       },
  //     },
  //   },
  // });
const user={
  email:'tarunpahade55@gmal.com',
  ownedRooms:[],
  roomInvites:[]
}
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen min-w-[264px] flex-col border-r border-gray-200 bg-white p-2">
        <UserMenu email={user.email} />
      </div>
      <div className="flex h-screen w-full flex-col">
        <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white pl-8">
          <h2 className="text-[13px]">Recents</h2>
        </div>
        <div className="flex h-full flex-col gap-10 p-8">
        <Canvas
        // roomName={room.title}
        // roomId={id}
        // othersWithAccessToRoom={room.roomInvites.map((x) => x.user)}
      />
        </div>
      </div>
    </div>
  );
}
