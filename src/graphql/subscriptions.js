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
export const onUpdateSubsection = /* GraphQL */ `
  subscription OnUpdateSubsection {
    onUpdateSubsection {
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
export const onDeleteSubsection = /* GraphQL */ `
  subscription OnDeleteSubsection {
    onDeleteSubsection {
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
