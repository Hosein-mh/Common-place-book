import { useState, useEffect, useCallback } from "react";
import { VoiceStreamer } from "../services/VoiceStreamer";

export const useVoiceStreamer = (language, onTextProcessed, onError) => {
  const [voiceStreamer, setVoiceStreamer] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const handleVoiceResult = (result) => {
      if (result.type === "audio-level") {
        setAudioLevel(result.audioLevel);
        return;
      }

      if (result.interim) {
        setLiveTranscript(result.text);
      } else {
        setFinalTranscript((prev) => prev + " " + result.text);
        setLiveTranscript("");
        onTextProcessed(result.text, result.confidence);
      }

      setConfidence(result.confidence || 0);
    };

    const handleVoiceError = (error) => {
      onError(error);
      setIsRecording(false);
    };

    const streamer = new VoiceStreamer(
      handleVoiceResult,
      handleVoiceError,
      language
    );
    setVoiceStreamer(streamer);

    return () => {
      if (streamer) {
        streamer.stop();
      }
    };
  }, [language, onTextProcessed, onError]);

  const startRecording = useCallback(async () => {
    if (voiceStreamer) {
      try {
        await voiceStreamer.start();
        setIsRecording(true);
      } catch (error) {
        onError("خطا در شروع ضبط: " + error.message);
      }
    }
  }, [voiceStreamer, onError]);

  const stopRecording = useCallback(() => {
    if (voiceStreamer) {
      voiceStreamer.stop();
      setIsRecording(false);
      setAudioLevel(0);
    }
  }, [voiceStreamer]);

  const resetTranscript = useCallback(() => {
    setLiveTranscript("");
    setFinalTranscript("");
    setConfidence(0);
  }, []);

  return {
    isRecording,
    audioLevel,
    liveTranscript,
    finalTranscript,
    confidence,
    startRecording,
    stopRecording,
    resetTranscript,
  };
};
