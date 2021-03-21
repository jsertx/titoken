import { useEffect, useState } from 'react';
import { api } from '../lib/contract';

export default function DashBoard({ signer }) {
    const [winnerName, setWinnerName] = useState(null);
    useEffect(async () => {
        api.getWinnerName().then(setWinnerName);
    }, []);

    return (
        <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
                <p>The current winner is: <span className="text-primary">{winnerName}</span></p>
            </div>
        </div>
    )
}