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
type ReturnType = [string, StringUndefined, (offer: string) => void, WebsocketError | undefined];

export default function SignalingServerManager(): ReturnType {
    const [instanceName, setInstanceName] = useState<string>("");
    const [wsConnection, setWsConnection] = useState<WebSocket>(new WebSocket("ws://127.0.0.1:8081/ws"));
    const [peerOffer, setPeerOffert] = useState<string | undefined>(undefined); 
    const [wsError, setWsError] = useState<WebsocketError>();

    const copyInstanceName = () => {
        navigator.clipboard.writeText(instanceName);
    }

    const sendOffer = (offer: string) => {
        wsConnection.send(offer);
    }

    useEffect(() => {

        wsConnection.onopen = () => {
            console.log("Connected")
        }

        wsConnection.onmessage = (msg) => {
            let msgObj: WebsocketSignal = JSON.parse(msg.data)
            switch (msgObj.type) {
                case "answer": {

                } break;
                case "assign": {
                    setInstanceName(msgObj.data.name);
                } break;
                case "error": {
                    setWsError(msg.data)
                } break;
                case "newIceCandidate": {

                } break;
                case "offer": {

                } break;

            }
        }
    }, [wsConnection])


    return [instanceName, peerOffer, sendOffer, wsError];
}