"use client";

import { useContext, useEffect } from 'react';
import { PeerConnectionContext } from '../lib/peerConnectionContext';

export default function Home() {
    const {peerConnection, dataChannel} = useContext(PeerConnectionContext);
    useEffect(() => {

    }, [dataChannel]);
    return <div>
        asdasd
    </div>
}