/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
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
          sectionId
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
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
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
          sectionId
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
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
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
          sectionId
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
export const onCreateSubsection = /* GraphQL */ `
  subscription OnCreateSubsection {
    onCreateSubsection {
      id
      ownerUsername
      sectionId
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
export const onUpdateSubsection = /* GraphQL */ `
  subscription OnUpdateSubsection {
    onUpdateSubsection {
      id
      ownerUsername
      sectionId
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
export const onDeleteSubsection = /* GraphQL */ `
  subscription OnDeleteSubsection {
    onDeleteSubsection {
      id
      ownerUsername
      sectionId
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
export const onCreateS3Object = /* GraphQL */ `
  subscription OnCreateS3Object {
    onCreateS3Object {
      bucket
      region
      key
    }
  }
`;
export const onUpdateS3Object = /* GraphQL */ `
  subscription OnUpdateS3Object {
    onUpdateS3Object {
      bucket
      region
      key
    }
  }
`;
export const onDeleteS3Object = /* GraphQL */ `
  subscription OnDeleteS3Object {
    onDeleteS3Object {
      bucket
      region
      key
    }
  }
`;
