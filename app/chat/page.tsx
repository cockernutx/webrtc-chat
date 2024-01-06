import { useContext } from 'react';
import { PeerConnectionContext } from '../lib/peerConnectionContext';

export default function Home() {
    const {peerConnection, dataChannel} = useContext(PeerConnectionContext);
    return <div>
        asdasd
    </div>
}