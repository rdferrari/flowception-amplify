/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
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
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
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
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
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
export const createSubsection = /* GraphQL */ `
  mutation CreateSubsection(
    $input: CreateSubsectionInput!
    $condition: ModelSubsectionConditionInput
  ) {
    createSubsection(input: $input, condition: $condition) {
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
export const updateSubsection = /* GraphQL */ `
  mutation UpdateSubsection(
    $input: UpdateSubsectionInput!
    $condition: ModelSubsectionConditionInput
  ) {
    updateSubsection(input: $input, condition: $condition) {
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
export const deleteSubsection = /* GraphQL */ `
  mutation DeleteSubsection(
    $input: DeleteSubsectionInput!
    $condition: ModelSubsectionConditionInput
  ) {
    deleteSubsection(input: $input, condition: $condition) {
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
