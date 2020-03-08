/**
 * Create an array of values representing a regular polygon face.
 *
 * @param {number}  sides   number of sides of the polygon
 * @param {number}  layers  puzzle layers
 */
export function createPolygon(sides: number, layers: number) {
    if (!Number.isInteger(sides) || sides < 3) {
        throw new Error('Polygon sides must be an integer of 3 or greater');
    }

    if (!Number.isInteger(layers) || layers < 2) {
        throw new Error('Polygon layers must be an integer of 2 or greater');
    }
}
