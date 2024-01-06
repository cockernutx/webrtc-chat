"use client";

import { useEffect, useState } from "react";
interface WebsocketSignal {
    type: "offer" | "answer" | "newIceCandidate" | "assign" | "error",
    data: any
}
export interface WebsocketError {
    errorType: "parserError" | "connectionClosed" | "connectionTimeout" | "targetNotFound" | "serviceUnavailable" | "serviceTimeout" | "userAlreadyJoined",
    data: any
}

type StringUndefined = string | undefined;
type AnyUndefined = any | undefined;
type ReturnType = [string, AnyUndefined, AnyUndefined, AnyUndefined, (offer: string) => void, WebsocketError | undefined];

export default function SignalingServerManager(): ReturnType {
    const [instanceName, setInstanceName] = useState<string>("");
    const [wsConnection, setWsConnection] = useState<WebSocket>(new WebSocket("ws://127.0.0.1:8081/ws"));
    const [peerOffer, setPeerOffer] = useState<any | undefined>(undefined); 
    const [peerAnswer, setPeerAnswer] = useState<any | undefined>(undefined);
    const [peerIce, setPeerIce] = useState<any | undefined>(undefined);
    const [wsError, setWsError] = useState<WebsocketError>();

    const copyInstanceName = () => {
        navigator.clipboard.writeText(instanceName);
    }

    const send = (payload: string) => {
        wsConnection.send(payload);
    }

    useEffect(() => {

        wsConnection.onopen = () => {
            console.log("Connected")
        }

        wsConnection.onmessage = (msg) => {
            let msgObj: WebsocketSignal = JSON.parse(msg.data)
            switch (msgObj.type) {
                case "answer": {
                    setPeerAnswer(msgObj)
                } break;
                case "assign": {
                    setInstanceName(msgObj.data.name);
                } break;
                case "error": {
                    setWsError(msg.data)
                } break;
                case "newIceCandidate": {
                    setPeerIce(msgObj)
                } break;
                case "offer": {
                    setPeerOffer(msgObj)
                } break;

            }
        }
    }, [wsConnection])


    return [instanceName, peerOffer, peerAnswer, peerIce, send, wsError];
}