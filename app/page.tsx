"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SignalingServerManager from './signalingServerManager';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { PeerConnectionContext } from './lib/peerConnectionContext';

export default function Home() {
  const [connectionTarget, setConnectionTarget] = useState<string>("");
  const [instanceName, peerOffer, sendOffer, wsError] = SignalingServerManager();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(new RTCPeerConnection());
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (peerOffer) {
      let data = peerOffer;
      peerConnection.setRemoteDescription({
        type: data.type,
        sdp: data.data.sdp
      })
    }
  }, [peerOffer])

  useEffect(() => {
    if (wsError) {
      switch (wsError.errorType) {
        case "targetNotFound":

          break;

        default:
          break;
      }
    }
  }, [wsError])

  useEffect(() => {
    if (dataChannel) {
      dataChannel.onopen = (ev) => {
        router.push("/chat")
      }
    }
  }, [dataChannel])

  const connectToPeer = async () => {
    if (connectionTarget == "") {
      alert("Please type the name of the peer!");
      return;
    }

    const dataChannelParams = { ordered: true };
    let channel = peerConnection.createDataChannel('messaging-channel', dataChannelParams);
    setDataChannel(channel);

    let offerOptions = {

    };
    let offer = await peerConnection.createOffer();

    await peerConnection.setLocalDescription(offer);

    let sdp = offer.sdp;

    let offerWithTarget = JSON.stringify({
      type: offer.type,
      data: {
        name: instanceName,
        target: connectionTarget,
        sdp: sdp
      }
    })

    sendOffer(offerWithTarget);
  }

  const copyName = () => {
    navigator.clipboard.writeText(instanceName)
  }

  return (
    <PeerConnectionContext.Provider value={{ peerConnection: peerConnection, dataChannel: dataChannel }}>
      <main className="h-screen bg-biroBlue-600">
        <div className='h-screen flex justify-center items-center'>
          <div className=" bg-biroBlue-500 shadow-md rounded p-8">
            <div className='w-max p-2 text-white flex flex-col gap-4'>
              <div className='flex flex-row'>
                <input className='rounded rounded-r-none p-1 text-black' value={connectionTarget} onChange={(e) => { setConnectionTarget(e.currentTarget.value) }} type="text"></input>
                <button className='bg-blueberry-500 hover:bg-blueberry-600 active:bg-blueberry-700 rounded rounded-l-none text-white p-1 py-2' onClick={connectToPeer}>Connect to peer!</button>
              </div>
              <div className=' bg-rose-100 text-black p-2 rounded flex'>
                <p className='inline'>Instance name: {instanceName}</p>
                <button className='ml-auto rounded-full p-1 flex  justify-center transition hover:bg-gray-100 hover:bg-opacity-60 active:bg-gray-200 active:bg-opacity-60' onClick={copyName} title='Copy'>
                  <span className="material-symbols-outlined align-bottom ">
                    content_copy
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </PeerConnectionContext.Provider>
  )
}
