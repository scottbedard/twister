import { DodecaminxAxis, DodecaminxFace, DodecaminxTurn } from './dodecaminx';

/**
 * Parse a dodecaminx turn.
 *
 * @param {string}  turn
 *
 * @return {DodecaminxTurn}
 */
export function parseDodecaminxTurn(turn: string): DodecaminxTurn {
    const result = turn.match(/^(\d)*(u|f|l|r|bl|br|dl|dr|dbl|dbr|b|d|U|F|L|R|BL|BR|DL|DR|DBL|DBR|B|D){1}(w)?(2)?(['-])?$/);

    if (result === null) {
        throw new Error(`Invalid turn: ${turn}`);
    }

    let depth: number = result[1] ? parseInt(result[1], 10) : 1;
    const target = <DodecaminxAxis | DodecaminxFace> result[2];
    const wide: boolean = Boolean(result[3]);
    let rotation: number = result[4] ? parseInt(result[4], 10) : 1;
    const modifier: string = result[5];

    if (wide && !result[1]) {
        depth = 2;
    }

    if (modifier === '-' || modifier === '\'') {
        rotation *= -1;
    }

    return { depth, rotation, target, wide };
}