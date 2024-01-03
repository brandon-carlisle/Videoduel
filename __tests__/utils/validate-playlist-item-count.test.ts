import { validatePlaylistItemCount } from "../../src/utils/validate-playlist-item-count";
import {expect, test} from "vitest"

test("expects array of length 7 to not be valid", () => {
    const testArray = Array.from(Array(7).keys());
    expect(validatePlaylistItemCount(testArray)).toBe(false)
})


test("expects array of length 32 to be valid", () => {
    const testArray = Array.from(Array(32).keys());
    expect(validatePlaylistItemCount(testArray)).toBe(true)
})
