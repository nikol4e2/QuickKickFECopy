import React, { useEffect, useState } from 'react';
import "./EliminationSimulation.css";

const EliminationSimulation = ({
                                   groupATeams,
                                   groupBTeams,
                                   groupCTeams,
                                   groupDTeams,
                                   groupETeams,
                                   groupFTeams,
                                   selectedGroups
                               }) => {

    const sortTeams = (a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }

        const diffA = a.scoredGoals - a.takenGoals;
        const diffB = b.scoredGoals - b.takenGoals;

        return diffB - diffA;
    };

    const sortedA = [...groupATeams].sort(sortTeams);
    const sortedB = [...groupBTeams].sort(sortTeams);
    const sortedC = [...groupCTeams].sort(sortTeams);
    const sortedD = [...groupDTeams].sort(sortTeams);
    const sortedE = [...groupETeams].sort(sortTeams);
    const sortedF = [...groupFTeams].sort(sortTeams);

    const [error, setError] = useState(null);
    const [hasError, setHasError] = useState(false);

    const [matches, setMatches] = useState([]);
    const [quarterFinalMatches, setQuarterFinalMatches] = useState([]);

    const makeMatchesPairs = () => {

        const matchMakers = [];

        /*
         * ============================
         * ОСМИНАФИНАЛЕ - ФИКСНИ ПАРОВИ
         * ============================
         */

        // ОФ1 -> 1-2
        matchMakers.push({
            team1: sortedA[0],
            team2: sortedC[1],
            type: "1-2"
        });

        // ОФ2 -> 2-2
        matchMakers.push({
            team1: sortedD[1],
            team2: sortedE[1],
            type: "2-2"
        });

        // ОФ3 -> 1-2
        matchMakers.push({
            team1: sortedD[0],
            team2: sortedF[1],
            type: "1-2"
        });

        // ОФ4 -> 2-2
        matchMakers.push({
            team1: sortedA[1],
            team2: sortedB[1],
            type: "2-2"
        });


        /*
         * ============================
         * ОСТАНАТИ ОСМИНАФИНАЛИЊА
         * ============================
         */

        const pairs = [
            {
                fix: "1B",
                pair: null
            },
            {
                fix: "1C",
                pair: null
            },
            {
                fix: "1E",
                pair: null
            },
            {
                fix: "1F",
                pair: null
            }
        ];

        const availableGroups = [...selectedGroups].sort();

        /*
         * Распределување на третопласираните
         */

        for (let i = 0; i < pairs.length; i++) {

            const winnerGroup = pairs[i].fix.charAt(1);

            for (let j = availableGroups.length - 1; j >= 0; j--) {

                const thirdGroup = availableGroups[j];

                if (winnerGroup !== thirdGroup) {

                    pairs[i].pair = thirdGroup;

                    availableGroups.splice(j, 1);

                    break;
                }
            }
        }


        /*
         * Функција за третопласиран тим
         */

        const getThirdPlaceTeam = (group) => {

            switch (group) {

                case "A":
                    return sortedA[2];

                case "B":
                    return sortedB[2];

                case "C":
                    return sortedC[2];

                case "D":
                    return sortedD[2];

                case "E":
                    return sortedE[2];

                case "F":
                    return sortedF[2];

                default:
                    return null;
            }
        };


        /*
         * ОФ5 -> 1-3
         */

        if (pairs[0].pair) {

            matchMakers.push({
                team1: sortedB[0],
                team2: getThirdPlaceTeam(pairs[0].pair),
                type: "1-3"
            });

        }


        /*
         * ОФ6 -> 1-3
         */

        if (pairs[1].pair) {

            matchMakers.push({
                team1: sortedC[0],
                team2: getThirdPlaceTeam(pairs[1].pair),
                type: "1-3"
            });

        }


        /*
         * ОФ7 -> 1-3
         */

        if (pairs[2].pair) {

            matchMakers.push({
                team1: sortedE[0],
                team2: getThirdPlaceTeam(pairs[2].pair),
                type: "1-3"
            });

        }


        /*
         * ОФ8 -> 1-3
         */

        if (pairs[3].pair) {

            matchMakers.push({
                team1: sortedF[0],
                team2: getThirdPlaceTeam(pairs[3].pair),
                type: "1-3"
            });

        }


        /*
         * ============================
         * ПРОВЕРКА ОСМИНАФИНАЛЕ
         * ============================
         */

        if (
            matchMakers.length !== 8 ||
            pairs.some(pair => pair.pair === null)
        ) {

            setError("Не може да се направи валидна ждрепка.");
            setHasError(true);

            return;
        }


        setError(null);
        setHasError(false);

        setMatches(matchMakers);


        /*
         * ============================
         * ЧЕТВРТФИНАЛЕ
         * ============================
         *
         * Треба да добиеме:
         *
         * 2 x 1-3 vs 1-2
         * 2 x 1-3 vs 2-2
         *
         * И НЕ смее да има иста група.
         */

        const oneTwoMatches = matchMakers
            .map((match, index) => ({
                ...match,
                index
            }))
            .filter(match => match.type === "1-2");

        const twoTwoMatches = matchMakers
            .map((match, index) => ({
                ...match,
                index
            }))
            .filter(match => match.type === "2-2");

        const oneThreeMatches = matchMakers
            .map((match, index) => ({
                ...match,
                index
            }))
            .filter(match => match.type === "1-3");


        /*
         * Ги земаме победниците од ОФ како placeholder.
         *
         * За проверката на групите го користиме
         * фактичкиот состав на ОФ.
         *
         * Бидејќи сè уште не знаеме кој ќе победи,
         * можеме да го ограничиме парот според можните
         * групи на екипите.
         */

        const getGroupsFromMatch = (match) => {

            const groups = [];

            if (match.team1?.group) {
                groups.push(match.team1.group);
            }

            if (match.team2?.group) {
                groups.push(match.team2.group);
            }

            return groups;
        };


        /*
         * Бидејќи тимовите можеби немаат "group" property,
         * ја одредуваме групата според името на екипата
         * преку самиот object reference.
         */

        const getTeamGroup = (team) => {

            if (!team) {
                return null;
            }

            if (sortedA.includes(team)) return "A";
            if (sortedB.includes(team)) return "B";
            if (sortedC.includes(team)) return "C";
            if (sortedD.includes(team)) return "D";
            if (sortedE.includes(team)) return "E";
            if (sortedF.includes(team)) return "F";

            return team.group || null;
        };


        /*
         * Ги враќа сите групи од еден ОФ.
         */

        const getPossibleGroups = (match) => {

            return [
                getTeamGroup(match.team1),
                getTeamGroup(match.team2)
            ].filter(Boolean);
        };


        /*
         * Проверка дали два ОФ може да се сретнат.
         *
         * Ако немаат заедничка група -> дозволено.
         */

        const canPlay = (matchA, matchB) => {

            const groupsA = getPossibleGroups(matchA);
            const groupsB = getPossibleGroups(matchB);

            return !groupsA.some(group => groupsB.includes(group));
        };


        /*
         * BACKTRACKING
         *
         * Бара:
         *
         * 2 x 1-3 vs 1-2
         * 2 x 1-3 vs 2-2
         */

        const findQuarterFinalPairs = () => {

            const used = new Set();
            const result = [];

            /*
             * Прво бараме два пара со 1-2.
             */

            const findPairs = (thirdIndex, firstCount, secondCount) => {

                if (
                    firstCount === 0 &&
                    secondCount === 0
                ) {
                    return true;
                }

                if (thirdIndex >= oneThreeMatches.length) {
                    return false;
                }

                const thirdMatch = oneThreeMatches[thirdIndex];

                /*
                 * Проба со 1-2
                 */

                if (firstCount > 0) {

                    for (let i = 0; i < oneTwoMatches.length; i++) {

                        const secondMatch = oneTwoMatches[i];

                        if (used.has(secondMatch.index)) {
                            continue;
                        }

                        if (!canPlay(thirdMatch, secondMatch)) {
                            continue;
                        }

                        used.add(thirdMatch.index);
                        used.add(secondMatch.index);

                        result.push({
                            team1: {
                                name: `Победник ОФ ${thirdMatch.index + 1}`
                            },
                            team2: {
                                name: `Победник ОФ ${secondMatch.index + 1}`
                            }
                        });

                        if (
                            findPairs(
                                thirdIndex + 1,
                                firstCount - 1,
                                secondCount
                            )
                        ) {
                            return true;
                        }

                        result.pop();

                        used.delete(thirdMatch.index);
                        used.delete(secondMatch.index);
                    }
                }


                /*
                 * Проба со 2-2
                 */

                if (secondCount > 0) {

                    for (let i = 0; i < twoTwoMatches.length; i++) {

                        const secondMatch = twoTwoMatches[i];

                        if (used.has(secondMatch.index)) {
                            continue;
                        }

                        if (!canPlay(thirdMatch, secondMatch)) {
                            continue;
                        }

                        used.add(thirdMatch.index);
                        used.add(secondMatch.index);

                        result.push({
                            team1: {
                                name: `Победник ОФ ${thirdMatch.index + 1}`
                            },
                            team2: {
                                name: `Победник ОФ ${secondMatch.index + 1}`
                            }
                        });

                        if (
                            findPairs(
                                thirdIndex + 1,
                                firstCount,
                                secondCount - 1
                            )
                        ) {
                            return true;
                        }

                        result.pop();

                        used.delete(thirdMatch.index);
                        used.delete(secondMatch.index);
                    }
                }


                /*
                 * Ако овој 1-3 не може да се искористи,
                 * пробај со следниот.
                 */

                return findPairs(
                    thirdIndex + 1,
                    firstCount,
                    secondCount
                );
            };


            if (findPairs(0, 2, 2)) {
                return result;
            }

            return null;
        };


        const quarterPairs = findQuarterFinalPairs();


        /*
         * Ако нема валидна комбинација
         */

        if (!quarterPairs || quarterPairs.length !== 4) {

            setError(
                "Не може да се направат валидни четвртфинални парови без екипи од иста група."
            );

            setHasError(true);

            return;
        }


        setQuarterFinalMatches(quarterPairs);
    };


    useEffect(() => {
        makeMatchesPairs();
    }, []);


    return (
        <div className="simulation-container">

            <h3 className="simulation-title">
                Осминафинале
            </h3>

            {hasError && (
                <div className="simulation-error">
                    {error}
                </div>
            )}

            <div className="matches-wrapper-simulation">

                {matches.map((match, index) => (

                    <div
                        key={index}
                        className={`match-row-simulation match-${index + 1}`}
                    >

                        <span className="match-simulation">
                            {match.team1?.name || "?"}
                            {" - "}
                            {match.team2?.name || "?"}
                        </span>

                    </div>

                ))}

            </div>


            <h3 className="simulation-title">
                Четвртфинале
            </h3>

            <div className="matches-wrapper-simulation">

                {quarterFinalMatches.map((match, index) => (

                    <div
                        key={index}
                        className={`match-row-simulation match-${index + 1}`}
                    >

                        <span className="match-simulation">
                            {match.team1?.name || "?"}
                            {" - "}
                            {match.team2?.name || "?"}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default EliminationSimulation;