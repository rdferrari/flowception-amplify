/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
      id
      order
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
          order
          ownerUsername
          sectionId
          url
          type
          title
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
      order
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
          order
          ownerUsername
          sectionId
          url
          type
          title
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
      order
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
          order
          ownerUsername
          sectionId
          url
          type
          title
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
      order
      ownerUsername
      sectionId
      file {
        bucket
        region
        key
      }
      url
      type
      title
      text
      createdAt
      updatedAt
      section {
        id
        order
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
      order
      ownerUsername
      sectionId
      file {
        bucket
        region
        key
      }
      url
      type
      title
      text
      createdAt
      updatedAt
      section {
        id
        order
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
      order
      ownerUsername
      sectionId
      file {
        bucket
        region
        key
      }
      url
      type
      title
      text
      createdAt
      updatedAt
      section {
        id
        order
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
    }
  }
`;
export const createS3Object = /* GraphQL */ `
  mutation CreateS3Object(
    $input: CreateS3ObjectInput!
    $condition: ModelS3ObjectConditionInput
  ) {
    createS3Object(input: $input, condition: $condition) {
      bucket
      region
      key
    }
  }
`;
export const updateS3Object = /* GraphQL */ `
  mutation UpdateS3Object(
    $input: UpdateS3ObjectInput!
    $condition: ModelS3ObjectConditionInput
  ) {
    updateS3Object(input: $input, condition: $condition) {
      bucket
      region
      key
    }
  }
`;
export const deleteS3Object = /* GraphQL */ `
  mutation DeleteS3Object(
    $input: DeleteS3ObjectInput!
    $condition: ModelS3ObjectConditionInput
  ) {
    deleteS3Object(input: $input, condition: $condition) {
      bucket
      region
      key
    }
  }
`;
