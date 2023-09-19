export function validatePlaylistItemCount<T>(playlist: T[]): boolean {
  switch (playlist.length) {
    case 8:
      return true;
    case 16:
      return true;
    case 32:
      return true;
    case 64:
      return true;
  }

  return false;
}
