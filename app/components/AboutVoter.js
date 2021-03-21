import { useEffect, useState } from 'react';
import { api } from '../lib/contract';
import { useForm } from "react-hook-form";

const newVoterAddressField = {
    required: "Please give a voter address! 🎉",
    pattern: {
        value: /0[xX][0-9a-fA-F]+/,
        message: "Invalid ethereum address 🤓"
    }

};

export default function AboutVoter({ signer }) {

    const { register, handleSubmit, errors } = useForm();
    const [voterAddress, setVoterAddress] = useState(null);
    const [isChairperson, setIsChairPerson] = useState(false)
    useEffect(async () => {
        const voterAddress = await signer.getAddress();
        const chairPersonAddress = await api.getChairperson();
        setVoterAddress(voterAddress);
        setIsChairPerson(voterAddress == chairPersonAddress)
    }, []);


    const onSubmit = async ({newVoterAddress}) => {
        api.giveRightToVote(newVoterAddress, signer)
    }

    const displayAddVoter = (isChairperson) => {
        if(isChairperson) {
            return  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <h5 className="card-title">Add right to vote</h5>
                <label className="form-label"></label>
                <div className="input-group mb-3">
                    <span className="input-group-text">ETH Address</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        ref={register(newVoterAddressField)}
                        name="newVoterAddress"
                        placeholder="0x...." />
                    <button className="btn btn-primary" type="submit">Add</button>
                </div>
                { errors && errors.newVoterAddress && <div className="alert alert-danger">{errors.newVoterAddress.message}</div> }
            </form>
        }
    }
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