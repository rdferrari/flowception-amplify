/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        owner
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
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      ownerUsername
      owner
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
          owner
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
export const getSubsection = /* GraphQL */ `
  query GetSubsection($id: ID!) {
    getSubsection(id: $id) {
      id
      ownerUsername
      owner
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
      section {
        id
        ownerUsername
        owner
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
        owner
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
        section {
          id
          ownerUsername
          owner
          title
          intro
          body
          url
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getS3Object = /* GraphQL */ `
  query GetS3Object($id: ID!) {
    getS3Object(id: $id) {
      bucket
      region
      key
    }
  }
`;
export const listS3Objects = /* GraphQL */ `
  query ListS3Objects(
    $filter: ModelS3ObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listS3Objects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        bucket
        region
        key
      }
      nextToken
    }
  }
`;
