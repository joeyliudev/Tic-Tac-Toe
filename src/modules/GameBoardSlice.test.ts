import { beforeEach, describe, expect, test } from '@jest/globals';
import { PlayerMove, currentPlayer, winner } from './GameBoardSlice';

describe('currentPlayer', () => {

    let moves: PlayerMove[] = [];

    test("player 1 move first", () => {
        expect(currentPlayer(moves)).toEqual(1);
    });

    test("should be player 2", () => {
        moves.push({ square: 1, player: 1 })
        expect(currentPlayer(moves)).toEqual(2);
    });

    test("should be player 1", () => {
        moves.push({ square: 2, player: 2 })
        expect(currentPlayer(moves)).toEqual(1);
    });

})

describe('winner', () => {

    let moves: PlayerMove[];
    beforeEach(() => {
        moves = [];
    })


    test('should retrun no winner', () => {
        expect(winner(moves)).toBeNull();

        moves.push(
            { player: 1, square: 1 },
            { player: 2, square: 2 },
            { player: 1, square: 3 },
            { player: 2, square: 4 },
        )
        expect(winner(moves)).toBeNull();
    })


    test('should return tie', () => {

        moves.push(
            { player: 1, square: 1 }, { player: 1, square: 2 }, { player: 2, square: 3 },
            { player: 2, square: 4 }, { player: 1, square: 5 }, { player: 1, square: 6 },
            { player: 1, square: 7 }, { player: 2, square: 8 }, { player: 2, square: 9 },
        )

        expect(winner(moves)).toEqual('tie');
    })

    test('player1 Win', () => {
        moves.push(
            { player: 1, square: 1 }, { player: 1, square: 2 }, { player: 2, square: 3 },
            { player: 1, square: 5 },
            { player: 2, square: 7 }, { player: 2, square: 8 }, { player: 1, square: 9 },
        );

        expect(winner(moves)).toEqual('player1')
    })


    test('player2 Win', () => {
        moves.push(
            { player: 2, square: 1 }, { player: 2, square: 2 }, { player: 2, square: 3 },
            { player: 1, square: 4 }, { player: 1, square: 5 },
            { player: 1, square: 7 }, { player: 1, square: 8 }, { player: 2, square: 9 },
        );

        expect(winner(moves)).toEqual('player2')
    })

    test('no winner', () => {
        moves.push(
            { player: 1, square: 1 }, { player: 1, square: 3 },
            { player: 2, square: 5 }, { player: 2, square: 6 },
            { player: 2, square: 7 }, { player: 1, square: 9 },
        );

        expect(winner(moves)).toBeNull();

    })

})



