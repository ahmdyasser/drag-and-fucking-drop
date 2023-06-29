import Image from "next/image";
import UploadFilePage from "./UploadFilePage";
import SummaryPage from "./summary";

export default function Home() {
  const isFileUploaded = false; // Add logic to determine if a file is uploaded

  return <div>{isFileUploaded ? <SummaryPage /> : <UploadFilePage />}</div>;
}
