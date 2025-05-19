import React, { useEffect, useState } from "react";
import { getScore } from "../../api/jobDescriptionService";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  ScoreBox,
  ScoreText,
  Label,
  LoadingText,
  GoBackButton,
  FeedbackText,
} from "./styled";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionId } = location.state;
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const r = await getScore(sessionId);
        if (r && r.status === 200 && r.data.code === 200) {
          setScore(r.data.score);
          setFeedback(r.data.feedback);

          const message = `Your interview score is ${r.data.score}. Feedback: ${r.data.feedback}`;
          const utterance = new SpeechSynthesisUtterance(message);
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        console.error("Error fetching score:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScore();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingText>Loading score...</LoadingText>
      ) : (
        <ScoreBox>
          <Label>Your Interview Score</Label>
          <ScoreText>{score}</ScoreText>
          <FeedbackText>{feedback}</FeedbackText>
          <GoBackButton onClick={() => navigate("/")}>Go Back</GoBackButton>
        </ScoreBox>
      )}
    </Container>
  );
};

export default Result;
