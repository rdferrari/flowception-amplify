import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import ItemSection from "./ItemSection";

import { listSections } from "../../graphql/queries";
import { onCreateSection } from "../../graphql/subscriptions";
import { deleteSection } from "../../graphql/mutations";

function ListSection({ user, group }) {
  const [sections, updateSections] = useState([]);
  // const [filteredSections, setFilteredSections] = useState([]);
  // const [filter, setFilter] = useState(null);

  useEffect(() => {
    getPublicData();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateSection)
    ).subscribe({
      next: data => {
        const {
          value: {
            data: { onCreateSection }
          }
        } = data;
        const sectionData = [onCreateSection, ...sections];
        updateSections(sectionData);
      }
    });
    return () => subscription.unsubscribe();
  }, [sections]);

  const getPublicData = async () => {
    const sectionData = await API.graphql({
      query: listSections,
      variables: {},
      authMode: "API_KEY"
    });
    updateSections(sectionData.data.listSections.items);
    // setFilter(null);
  };

  const handleDeleteContent = async sectionId => {
    const input = { id: sectionId };
    await API.graphql(graphqlOperation(deleteSection, { input }));
    getPublicData();
  };

  // const handleSearch = event => {
  //   event.preventDefault();
  //   const query = filter.toLowerCase();

  //   const matchedSections = sections.filter(section => {
  //     return (
  //       section.title.toLowerCase().includes(query) ||
  //       section.intro.toLowerCase().includes(query)
  //     );
  //   });
  //   updateSections(matchedSections);
  //   setFilter("");
  //   console.log(filter);
  // };

  // const resetSearch = event => {
  //   event.preventDefault();

  //   event.target.search = null;

  //   getPublicData();
  //   setFilter(null);
  // };

  return (
    <div>
      <h2>Section List</h2>
      {/* <form onSubmit={handleSearch}>
        <input
          name="search"
          onChange={event => setFilter(event.target.value)}
          placeholder="Search sections"
        />
        <button type="submit">search</button>
        <button onClick={resetSearch}>reset</button>
  </form> */}
      <ItemSection
        sections={sections}
        handleDeleteContent={handleDeleteContent}
        user={user}
        group={group}
      />
    </div>
  );
}

export default ListSection;
