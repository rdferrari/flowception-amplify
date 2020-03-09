/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      ownerUsername
      title
      intro
      body
      file {
        bucket
        region
        key
      }
      url
      createdAt
      updatedAt
      subsections {
        items {
          id
          ownerUsername
          url
          type
          text
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerUsername
        title
        intro
        body
        file {
          bucket
          region
          key
        }
        url
        createdAt
        updatedAt
        subsections {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getSubsection = /* GraphQL */ `
  query GetSubsection($id: ID!) {
    getSubsection(id: $id) {
      id
      ownerUsername
      section {
        id
        ownerUsername
        title
        intro
        body
        file {
          bucket
          region
          key
        }
        url
        createdAt
        updatedAt
        subsections {
          nextToken
        }
      }
      file {
        bucket
        region
        key
      }
      url
      type
      text
      createdAt
      updatedAt
    }
  }
`;
export const listSubsections = /* GraphQL */ `
  query ListSubsections(
    $filter: ModelSubsectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubsections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerUsername
        section {
          id
          ownerUsername
          title
          intro
          body
          url
          createdAt
          updatedAt
        }
        file {
          bucket
          region
          key
        }
        url
        type
        text
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
