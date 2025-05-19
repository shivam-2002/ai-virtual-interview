declare module "react-speech-recognition" {
  export interface UseSpeechRecognitionOptions {
    commands?: Array<any>;
    transcribing?: boolean;
    interimResults?: boolean;
    continuous?: boolean;
    clearTranscriptOnListen?: boolean;
  }

  export interface SpeechRecognitionHook {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    resetTranscript: () => void;
    listening: boolean;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  }

  export function useSpeechRecognition(
    options?: UseSpeechRecognitionOptions
  ): SpeechRecognitionHook;

  const SpeechRecognition: {
    startListening: (options?: {
      continuous?: boolean;
      language?: string;
    }) => void;
    stopListening: () => void;
    abortListening: () => void;
  };

  export default SpeechRecognition;
}
