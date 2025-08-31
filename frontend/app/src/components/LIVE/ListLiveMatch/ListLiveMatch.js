import React, { useEffect, useState } from 'react';
import Service from "../../../repository/repository";
import { Link } from "react-router-dom";
import "./listLiveMatch.css";

const ListLiveMatch = () => {
    const [liveMatch, setLiveMatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMatch();
    }, []);

    const loadMatch = () => {
        setLoading(true);
        Service.fetchAllMatchesByStatus({ status: "PLAYING" })
            .then((response) => {
                if (response.data.length > 0) {
                    const matchId = response.data[0].id;
                    loadLiveMatch(matchId);
                } else {
                    setLiveMatch(null);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const loadLiveMatch = (matchId) => {
        Service.fetchPlayingMatchByMatchId(matchId)
            .then((response) => {
                setLiveMatch(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="live-match-container">
            <div>Натпревар кој моментално се одржува:</div>

            {loading ? (
                <div className="spinner"></div>
            ) : liveMatch ? (
                <div className="live-match-card">
                    <p>{liveMatch.match.team1.name} - {liveMatch.match.team2.name}</p>
                    <Link to={`/live/${liveMatch.id}`}>
                        <button>СЛЕДИ ГО НАТПРЕВАРОТ ВО ЖИВО</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <div>Нема тековни натпревари.</div>
                    <div>Обидете се повторно во термин кога има закажано натпревар.</div>
                </div>
            )}
        </div>
    );
};

export default ListLiveMatch;