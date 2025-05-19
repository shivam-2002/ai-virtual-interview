import React, { useState } from "react";
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  TextArea,
  FileInput,
  SubmitButton,
} from "./styled";
import { submitJobApplication } from "../../api/jobDescriptionService";
import { useNavigate } from "react-router-dom";

const JobDescription: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    responsibilities: "",
    qualifications: "",
    other: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    company: "",
    location: "",
    responsibilities: "",
    qualifications: "",
    resume: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const curr_error = {
      title: "",
      company: "",
      location: "",
      responsibilities: "",
      qualifications: "",
      resume: "",
    };

    let valid = true;
    if (!resumeFile) {
      curr_error.resume = "Please upload a resume";
      valid = false;
    }
    if (!formData.title) {
      curr_error.title = "Title is Required Field";
      valid = false;
    }
    if (!formData.company) {
      curr_error.company = "Company Name is required field";
      valid = false;
    }
    if (!formData.location) {
      curr_error.location = "Location is required field";
      valid = false;
    }
    if (!formData.responsibilities) {
      curr_error.responsibilities = "Responsibility is required field";
      valid = false;
    }
    if (!formData.qualifications) {
      curr_error.qualifications = "Qualification is required field";
      valid = false;
    }

    setErrors(curr_error);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!resumeFile) return;

    const res = await submitJobApplication(
      {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        responsibilities: formData.responsibilities,
        qualifications: formData.qualifications,
        other: formData.other,
      },
      resumeFile
    );

    if (res && res.status === 200 && res.data.code === 200) {
      navigate("/interview", {
        state: { userId: res.data.user_id, sessionId: res.data.session_id },
      });
    } else {
      window.alert("error");
    }
  };

  return (
    <Container>
      <Title> Resume & Submit Job Description</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="resume">Upload Resume</Label>
        <FileInput
          id="resume"
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
        />

        {errors.resume && <div className="error"> {errors.resume}</div>}

        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Frontend Developer"
        />

        {errors.title && <div className="error"> {errors.title}</div>}

        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g., TechCorp Inc."
        />
        {errors.company && <div className="error"> {errors.company}</div>}

        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Remote / Bengaluru"
        />
        {errors.location && <div className="error"> {errors.location}</div>}

        <Label htmlFor="responsibilities">Responsibilities</Label>
        <TextArea
          id="responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          rows={4}
          placeholder="List key responsibilities..."
        />
        {errors.responsibilities && (
          <div className="error"> {errors.responsibilities}</div>
        )}

        <Label htmlFor="qualifications">Qualifications</Label>
        <TextArea
          id="qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          rows={4}
          placeholder="List required qualifications..."
        />
        {errors.qualifications && (
          <div className="error"> {errors.qualifications}</div>
        )}

        <Label htmlFor="other">Other Information</Label>
        <TextArea
          id="other"
          name="other"
          value={formData.other}
          onChange={handleChange}
          rows={2}
          placeholder="Optional: Benefits, notes, etc."
        />

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default JobDescription;
