import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/ProjectMutations";

export default function DeleteprojectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <>
      <div className="d-flex mt-5 mx-auto">
        <button className="btn btn-danger" onClick={deleteProject}>
          <FaTrash /> Delete Project
        </button>
      </div>
    </>
  );
}
