import { createContext } from "react"

export interface ChatContextValues {
    peerConnection: RTCPeerConnection | undefined,
    setPeerConnection: (conn: RTCPeerConnection) => void,
    dataChannel: RTCDataChannel | undefined,
    setDataChannel: (channel: RTCDataChannel) => void,
    peerName: string,
    setPeerName: (name: string) => void,
    instanceName: string,
    setInstanceName: (name: string) => void,
}

const defaultValues: ChatContextValues = {
    peerConnection: undefined,
    setPeerConnection: (connection) => {},
    dataChannel: undefined,
    setDataChannel: (channel) => {},
    peerName: "",
    setPeerName: (name) => {},
    instanceName: "",
    setInstanceName: (name) => {}
}

export const ChatContext = createContext(defaultValues)