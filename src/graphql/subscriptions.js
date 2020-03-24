/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
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
      urlKey
      urlPath
      createdAt
      updatedAt
      subsections {
        items {
          id
          order
          ownerUsername
          sectionId
          urlKey
          urlPath
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
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
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
      urlKey
      urlPath
      createdAt
      updatedAt
      subsections {
        items {
          id
          order
          ownerUsername
          sectionId
          urlKey
          urlPath
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
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
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
      urlKey
      urlPath
      createdAt
      updatedAt
      subsections {
        items {
          id
          order
          ownerUsername
          sectionId
          urlKey
          urlPath
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
export const onCreateSubsection = /* GraphQL */ `
  subscription OnCreateSubsection {
    onCreateSubsection {
      id
      order
      ownerUsername
      sectionId
      file {
        bucket
        region
        key
      }
      urlKey
      urlPath
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
        urlKey
        urlPath
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
      order
      ownerUsername
      sectionId
      file {
        bucket
        region
        key
      }
      urlKey
      urlPath
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
        urlKey
        urlPath
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
      order
      ownerUsername
      sectionId
      file {
        bucket
        region
        key
      }
      urlKey
      urlPath
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
        urlKey
        urlPath
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
