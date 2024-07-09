import { ClientUploadFile } from "./ClientUploadFile";

export const UploadFile: React.FC<{
  instructionText1: string;
  instructionText2: string;
  instructionText3: string;
  or: string;
}> = ({ instructionText1, instructionText2, instructionText3, or }) => {
  return (
    <ClientUploadFile
      instructionText1={instructionText1}
      instructionText2={instructionText2}
      instructionText3={instructionText3}
      or={or}
    />
  );
};
