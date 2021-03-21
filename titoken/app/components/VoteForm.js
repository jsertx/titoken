import { useState } from 'react';
import { api } from '../lib/contract';


// temporal until I can get proposals from contract
const votingOptions = [
    [0, 'Sergiu'],
    [1, 'Tito'],
    [2, 'Carlixu']
];

export default function VoteForm({ signer }) {
    const [proposals, setProposals] = useState(votingOptions);
    const [votingError, setVotingError] = useState(null)
    const [chosenProposal, choseProposal] = useState(null)

    const emitVote = async () => {
        if (!chosenProposal) {
            return alert("Pick something!")
        }

        api.vote(chosenProposal, signer).then(
            (tx) => tx.wait(),
            (error) => setVotingError(error.error.message)
        );
    }

    const getVoteName = () => chosenProposal && votingOptions.find(opt => opt[0] == chosenProposal)[1];
    const drawVotingOption = ([id, participant]) => <label key={id}><input onChange={(e) => choseProposal(event.target.value)} type="radio" name="participant" value={id} /> {participant}</label>

    return (
        <div className="card">
            <div className="card-header">Candidates</div>
            <div className="card-body">
                <h5 className="card-title">Please, choose a badass</h5>
                <p className="card-text">Take care when voting as you know what will happen to the winner.</p>
                <div className="voting-options mb-3">
                    {proposals.map(drawVotingOption)}
                </div>
                <button onClick={emitVote} className="btn btn-primary">Vote</button>
                {votingError ? <div className="alert alert-danger mt-3">{votingError}</div> : ''}
            </div>
            <style>{`
                .voting-options label {
                    display: block;
                    cursor: pointer
                }
            `}</style>
        </div>
    )
}