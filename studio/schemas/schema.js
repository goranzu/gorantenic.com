// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "gorantenic.com",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      title: "Project summary",
      name: "demo",
      type: "document",
      fields: [
        {
          title: "SubTitle",
          name: "subtitle",
          type: "string",
        },
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Text",
          name: "text",
          type: "text",
        },
      ],
    },
    {
      title: "Hero section content",
      name: "hero",
      type: "document",
      fields: [
        {
          title: "SubTitle",
          name: "subtitle",
          type: "string",
        },
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Text",
          name: "text",
          type: "text",
        },
      ],
    },
    {
      title: "About content",
      name: "about",
      type: "document",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Content",
          name: "content",
          type: "text",
        },
      ],
    },
  ]),
});
