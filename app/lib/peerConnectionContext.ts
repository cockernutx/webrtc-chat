import { createContext } from "vm";

export interface PeerConnectionContextValues {
    peerConnection: RTCPeerConnection,
    dataChannel: RTCDataChannel | undefined
}

const defaultValues: PeerConnectionContextValues = {
    peerConnection: new RTCPeerConnection(),
    dataChannel: undefined
}

export const PeerConnectionContext = createContext(defaultValues)