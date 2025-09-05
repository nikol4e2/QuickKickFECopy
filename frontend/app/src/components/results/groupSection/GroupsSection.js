import React, { useEffect, useState } from 'react';
import Service from "../../../repository/repository.js";
import "./groupsSection.css";
import EliminationSimulation from "../../eliminationSimulation/EliminationSimulation";

const GroupsSection = () => {
    const [groupATeams, setGroupATeams] = useState([]);
    const [groupBTeams, setGroupBTeams] = useState([]);
    const [groupCTeams, setGroupCTeams] = useState([]);
    const [groupDTeams, setGroupDTeams] = useState([]);
    

    const [showSimulation, setShowSimulation] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeamsByGroup();
    }, []);

    const loadTeamsByGroup = () => {
        setLoading(true);
        Promise.all([
            Service.fetchTeamsRankedByGroup("A"),
            Service.fetchTeamsRankedByGroup("B"),
            Service.fetchTeamsRankedByGroup("C"),
            Service.fetchTeamsRankedByGroup("D"),
            
        ])
        .then(([groupARes, groupBRes, groupCRes, groupDRes]) => {
            setGroupATeams(groupARes.data);
            setGroupBTeams(groupBRes.data);
            setGroupCTeams(groupCRes.data);
            setGroupDTeams(groupDRes.data);
    
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    };

    const handleToggleSimulation = () => {
        setShowSimulation(prev => !prev);
    };

    const handleSelectGroup = (groupName) => {
        setSelectedGroups(prev => {
            if (prev.includes(groupName)) {
                return prev.filter(g => g !== groupName);
            } else if (prev.length < 4) {
                return [...prev, groupName];
            } else {
                return prev;
            }
        });
    };

    const renderGroupTable = (title, teams) => (
        <div className="group-table-wrapper">
            <h3 className="group-title">{title}</h3>
            <table className="group-table">
                <thead>
                    <tr className="table-head">
                        <th>Екипа</th>
                        <th>Одиграни</th>
                        <th>Победи</th>
                        <th>Нерешени</th>
                        <th>Дадени голови</th>
                        <th>Примени голови</th>
                        <th>Гол разлика</th>
                        <th>Бодови</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.length > 0 ? (
                        teams.map(team => (
                            <tr key={team.id}>
                                <td>{team.name}</td>
                                <td>{team.wins + team.draws + team.losses}</td>
                                <td>{team.wins}</td>
                                <td>{team.draws}</td>
                                <td>{team.scoredGoals}</td>
                                <td>{team.takenGoals}</td>
                                <td>{team.scoredGoals - team.takenGoals}</td>
                                <td>{team.points}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Нема внесени тимови</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="groups-section-container">
             {/* 
<button className="simulate-btn" onClick={handleToggleSimulation}>
    {showSimulation ? "Затвори" : "Симулирај осминафинале"}
</button>
*/}
            {/* Симулација осминафинале (опционално) */}
            {showSimulation && (
                <div className="simulation-selection">
                    <h3>Избери 4 групи од кои ќе продолжат третопласирани:</h3>
                    <div className="checkbox-wrapper">
                        {["A", "B", "C", "D", "E", "F"].map(g => (
                            <label key={g} className="group-label">
                                <input
                                    type="checkbox"
                                    checked={selectedGroups.includes(g)}
                                    onChange={() => handleSelectGroup(g)}
                                    disabled={!selectedGroups.includes(g) && selectedGroups.length >= 4}
                                />
                                Група {g}
                            </label>
                        ))}
                    </div>

                    {selectedGroups.length === 4 && (
                        <EliminationSimulation
                            groupATeams={groupATeams}
                            groupBTeams={groupBTeams}
                            groupCTeams={groupCTeams}
                            groupDTeams={groupDTeams}
                           // groupETeams={groupETeams}
                           // groupFTeams={groupFTeams}
                            selectedGroups={selectedGroups}
                        />
                    )}
                </div>
            )}

            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <h2 className="section-title">Групи</h2>
                    {renderGroupTable("Група А", groupATeams)}
                    {renderGroupTable("Група B", groupBTeams)}
                    {renderGroupTable("Група C", groupCTeams)}
                    {renderGroupTable("Група D", groupDTeams)}
                  </>
            )}
        </div>
    );
};

export default GroupsSection;