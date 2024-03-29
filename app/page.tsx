"use client";
import React, { useEffect, useState } from 'react'
import SignalingServerManager from './signalingServerManager';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ChatContext } from './lib/ChatContext';

export default function Home() {
  const {peerConnection, setPeerConnection, dataChannel, peerName, setDataChannel, setPeerName, setInstanceName} = useContext(ChatContext);
  const [instanceName, peerOffer, peerAnswer, peerIce, send, wsError] = SignalingServerManager();
  const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(peerConnection == undefined) {
      setPeerConnection(new RTCPeerConnection())
    }
  }, [])

  useEffect(() => {
    if (peerConnection) {
      peerConnection.ondatachannel = (channel) => {
        setDataChannel(channel.channel)
      }
      peerConnection.onicecandidate = (ice) => {
        setIceCandidate(ice.candidate);
      }
      peerConnection.onconnectionstatechange = (state) => {
        if (peerConnection.iceConnectionState === "connected") {
          router.push("/chat")
        }
      }
    }
  }, [peerConnection])

  useEffect(() => {
    setInstanceName(instanceName);
  }, [instanceName])

  useEffect(() => {
    if(iceCandidate != null) {
      let candidate = {
        type: "newIceCandidate",
        data: {
          target: peerName,
          candidate: JSON.stringify(iceCandidate),
          name: instanceName
        }
      }

      send(JSON.stringify(candidate));
    }
  }, [iceCandidate])

  useEffect(() => {
    if (peerOffer) {
      let data = peerOffer;

      sendAnswer(data);
    }
  }, [peerOffer])

  const sendAnswer = async (data: any) => {
    let target = data.data.name;
    setPeerName(target);
    await peerConnection!.setRemoteDescription({
      type: data.type,
      sdp: data.data.sdp
    });

    let answer = await peerConnection!.createAnswer();
    await peerConnection!.setLocalDescription(answer)

    let answerWithTarget = JSON.stringify({
      type: answer.type,
      data: {
        name: instanceName,
        target: target,
        sdp: answer.sdp
      }

    });

    send(answerWithTarget);
  }

  useEffect(() => {
    if (peerAnswer) {
      peerConnection!.setRemoteDescription({
        type: peerAnswer.type,
        sdp: peerAnswer.data.sdp
      });
    }
  }, [peerAnswer]);

  useEffect(() => {
    if (peerIce) {
      peerConnection!.addIceCandidate(JSON.parse(peerIce.data.candidate))
    }
  }, [peerIce]);

  useEffect(() => {
    if (wsError) {
      switch (wsError.errorType) {
        case "targetNotFound":
          alert("Target not found!")
          break;

        default:
          break;
      }
    }
  }, [wsError])

  const connectToPeer = async () => {
    if (peerName == "") {
      alert("Please type the name of the peer!");
      return;
    }

    const dataChannelParams = { ordered: true };
    let channel = peerConnection!.createDataChannel('messaging-channel', dataChannelParams);
    setDataChannel(channel);

    let offerOptions = {

    };
    let offer = await peerConnection!.createOffer();

    await peerConnection!.setLocalDescription(offer);

    let sdp = offer.sdp;

    let offerWithTarget = JSON.stringify({
      type: offer.type,
      data: {
        name: instanceName,
        target: peerName,
        sdp: sdp
      }
    })

    send(offerWithTarget);
  }

  const copyName = () => {
    navigator.clipboard.writeText(instanceName)
  }

  return (
      <main className="h-screen bg-biroBlue-600">
        <div className='h-screen flex justify-center items-center'>
          <div className=" bg-biroBlue-500 shadow-md rounded p-8">
            <div className='w-max p-2 text-white flex flex-col gap-4'>
              <div className='flex flex-row'>
                <input className='rounded rounded-r-none p-1 text-black' value={peerName} onChange={(e) => { setPeerName(e.currentTarget.value) }} type="text"></input>
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
  )
}
