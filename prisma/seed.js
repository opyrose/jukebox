const prisma = require("../prisma");

const seed = async (numUsers = 5, numPlaylists = 10, numTracks = 20) => {

    const users = Array.from({ length: numUsers }, (_, i) => ({
        username: `${i + 1}`,
    }));
   const createdUsers=  await prisma.user.createManyAndReturn({ data: users });
   console.log(createdUsers)

    const tracks = Array.from({ length: numTracks }, (_, i) => ({
        name: `${i + 1}`,
    }));
    console.log(tracks)
    await prisma.track.createMany({ data: tracks });

    for (let i = 0; i < numPlaylists; i++) {
        const playlistsAmount = 1 + Math.floor(Math.random() * 10);

        const playlist = Array.from({ length: playlistsAmount }, () => ({
            id: 1 + Math.floor(Math.random() * numTracks),
        }));

        await prisma.playlist.create({
            data: {
                name: ` Playlist`,
                description: `This is a coffee morning playlist!`,
                userId:  createdUsers[0].id,
                tracks: { connect: playlist },
            }
        })
    }
};

seed()

.then(async ()=> await prisma.$disconnect())
.catch(async (e) =>{
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})