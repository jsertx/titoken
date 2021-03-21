import Head from 'next/head'
import { useEffect, useState } from 'react';
import { api } from '../lib/contract';
import VoteForm from '../components/VoteForm';
import DashBoard from '../components/DashBoard';
import AboutVoter from '../components/AboutVoter';

export default function Home() {

  const [signer, setSigner] = useState(null);

  useEffect(() => api.getSigner().then(setSigner), [])

  return signer && (
    <div>
      <Head>
        <title>Voting Contract</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3" >
                <DashBoard signer={signer}></DashBoard>
              </div>
              <VoteForm signer={signer}></VoteForm>
            </div>
            <div className="col-md-6">
              <AboutVoter signer={signer}></AboutVoter>
            </div>
          </div>
        </div>

      </main>

    </div>
  )
}
