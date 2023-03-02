import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Client = () => {
  const [audio, setAudio] = useState(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3002');

    socket.addEventListener('open', () => {
      console.log('Connected to server!');
      setConnected(true);
    });

    socket.addEventListener('message', (event) => {
      const audioBlob = event.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
    });

    socket.addEventListener('close', () => {
      console.log('Disconnected from server!');
      setConnected(false);
      setAudio(null);
    });

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handlePlay = () => {
    if (audio) {
      const audioRef = new Audio(audio);
      audioRef.play();
    }
  };

  const handlePause = () => {
    if (audio) {
      const audioRef = new Audio(audio);
      audioRef.pause();
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {audio ? (
            <audio src={audio} />
          ) : (
            <p>No audio available</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handlePlay} disabled={!audio}>
            Play
          </Button>
          <Button onClick={handlePause} disabled={!audio}>
            Pause
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Client;
