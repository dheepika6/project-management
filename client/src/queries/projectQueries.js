import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      name
      status
      description
    }
  }
`;
