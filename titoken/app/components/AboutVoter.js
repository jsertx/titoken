import { useEffect, useState } from 'react';
import { api } from '../lib/contract';

const displayAddVoter = (isChairperson) => {
    if(isChairperson) {
        return <div className="card-body">
            <h5 className="card-title">Add right to vote</h5>
            <label className="form-label"></label>
            <div className="input-group mb-3">
                <span className="input-group-text">ETH Address</span>
                <input type="text" className="form-control" id="voter-address"  placeholder="0x...." />
                <button className="btn btn-primary" type="button">Add</button>
            </div>
        </div>
    }
}

export default function AboutVoter({ signer }) {
    const [voterAddress, setVoterAddress] = useState(null);
    const [isChairperson, setIsChairPerson] = useState(false)
    useEffect(async () => {
        const voterAddress = await signer.getAddress();
        const chairPersonAddress = await api.getChairperson();
        setVoterAddress(voterAddress);
        setIsChairPerson(voterAddress == chairPersonAddress)
    }, []);

    return (
        <div className="card">
            <div className="card-header">Voter information</div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">ETH Address <span className="badge bg-success voter-address">{voterAddress}</span></li>
                {isChairperson ? <li className="list-group-item">Is the contract administrator</li> : ''}
            </ul>
            { displayAddVoter(isChairperson) }
            <style>{`
                .voter-address{
                font-family: monospace;
                font-size: 12px
                }
            `}</style>
        </div>

    )
}