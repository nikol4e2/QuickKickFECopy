import React, { useEffect, useState } from 'react';
import Service from '../../../repository/repository.js';
import "./teamsSection.css";
import { Link } from "react-router-dom";

const TeamsSection = () => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = () => {
        setLoading(true);
        Service.fetchTeams()
            .then(data => setTeams(data.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <div className="teams-wrapper">
            <h2 className="teams-title">ТИМОВИ</h2>

            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="teams-table-container">
                    <table className="teams-table">
                        <thead>
                            <tr>
                                <th>Име</th>
                                <th>Детали</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.length > 0 ? teams.map(team => (
                                <tr key={team.id}>
                                    <td>{team.name}</td>
                                    <td>
                                        <Link to={`/teams/${team.id}`}>Кликни овде за повеќе детали</Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="2">Нема внесени тимови</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default TeamsSection;