export function validatePlaylistItemCount<T>(playlist: T[]): boolean {
  return [2, 4, 8, 16, 32, 64].includes(playlist.length);
}
