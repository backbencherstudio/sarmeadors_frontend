import ResuableMenu from "../common/ResuableMenu";

function CandidateDocumentMenu() {
  const candidateJobMenus = [
    {
      id: 1,
      title: "All Documents",
      href: "/candidate/candidate-documents",
    },
    {
      id: 2,
      title: "Required Documents",
      href: "/candidate/candidate-documents/required-documents",
    },
    {
      id: 3,
      title: "Additional Documents",
      href: "/candidate/candidate-documents/additional-documents",
    },
  ];

  return (
    <div>
      <ResuableMenu initialPath="/candidate/candidate-documents" menuData={candidateJobMenus} />
    </div>
  );
}

export default CandidateDocumentMenu;
