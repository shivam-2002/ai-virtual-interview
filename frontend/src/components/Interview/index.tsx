import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  nextQuestion,
  startInterview,
  storeAnswer,
} from "../../api/jobDescriptionService";
import {
  Container,
  QuestionCard,
  QuestionText,
  StyledTextarea,
  ButtonRow,
  Button,
  LoadingText,
  ModalOverlay,
  ModalContent,
} from "./styled";

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, sessionId } = location.state;

  const [questions, setQuestions] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && listening) {
      const prev = [...questions];
      prev[active] = {
        ...prev[active],
        answer: prev[active].answer + " " + transcript,
      };
      setQuestions(prev);
      resetTranscript();
    }
  }, [transcript]);

  const start = async () => {
    setLoading(true);
    try {
      const res = await startInterview(userId, sessionId);
      if (res?.status === 200 && res.data.code === 200) {
        const q = res.data.question;
        speakText(q);
        setQuestions([{ question: q, answer: "" }]);
        setStarted(true);
      } else if (
        res?.status === 200 &&
        res.data.code === 400 &&
        res.data.completed
      ) {
        window.alert("Interview Ended");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  const writeAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const prev = [...questions];
    prev[active] = { ...prev[active], answer: event.target.value };
    setQuestions(prev);
  };

  const submitAns = async () => {
    setLoading(true);
    try {
      const res = await storeAnswer(sessionId, questions[active].answer);
      if (res?.status === 200 && res.data.code === 200) {
        const next = await nextQuestion(sessionId);
        if (next?.status === 200 && next.data.code === 200) {
          const q = next.data.question;
          speakText(q);
          setQuestions((prev) => [...prev, { question: q, answer: "" }]);
          setActive((prev) => prev + 1);
          resetTranscript();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
  };

  const endInterview = () => {
    setShowModal(true);
  };

  const confirmEnd = () => {
    setShowModal(false);
    navigate("/result", { state: { sessionId } });
    window.speechSynthesis.cancel();
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn't support speech recognition.</p>;
  }

  return (
    <Container>
      {!started ? (
        <Button onClick={start} disabled={loading}>
          {loading ? "Loading..." : "Start Interview"}
        </Button>
      ) : (
        <>
          {questions.map((item, ind) => (
            <QuestionCard key={ind}>
              <QuestionText>{item.question}</QuestionText>
              <StyledTextarea
                value={item.answer}
                disabled={ind !== active}
                onChange={writeAnswer}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              {ind === active && (
                <Button onClick={toggleListening}>
                  {listening ? "Stop Listening" : "Start Speaking"}
                </Button>
              )}
            </QuestionCard>
          ))}

          {loading && <LoadingText>Processing...</LoadingText>}

          <ButtonRow>
            <Button onClick={submitAns} disabled={loading}>
              {loading ? "Submitting..." : "Submit Answer"}
            </Button>
            <Button onClick={endInterview} disabled={loading} $secondary>
              End Interview
            </Button>
          </ButtonRow>
        </>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <p>Are you sure you want to end the interview?</p>
            <ButtonRow>
              <Button onClick={confirmEnd}>Yes</Button>
              <Button onClick={() => setShowModal(false)} $secondary>
                No
              </Button>
            </ButtonRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Interview;
