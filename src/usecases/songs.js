import { spotty } from "../externals/index.js";

export const songsUsecase = {
  list: async () => {
    try {
      const data = await spotty.getTracks(50);
      const tracks = [];
      for (const item of data) {
        tracks.push({
          Name: item.track.name,
          Artists: item.track.artists.map((a) => a.name).join(","),
          Album: item.track.album.name,
          URL: item.track.external_urls.spotify,
          ListenedOn: item.played_at,
          Image: item.track.album.images.at(0) ?? null,
        });
      }
      return tracks;
    } catch (err) {
      console.error(err);
    }
  },
};
