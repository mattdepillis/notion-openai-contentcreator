import { AddIcon, ChatIcon, EditIcon, SmallAddIcon } from "@chakra-ui/icons"

export const gridActions = [
  {
    "id": 1,
    "name": "Create a database entry",
    "description": "Create a new entry in a Notion database within your workspace with OpenAI DaVinci.",
    "buttonText": "Create entry",
    "icon": AddIcon
  },
  {
    "id": 2,
    "name": "Create a subpage",
    "description": "Create a subpage within a Notion page in your workspace with OpenAI DaVinci.",
    "buttonText": "Create subpage",
    "icon": AddIcon
  },
  {
    "id": 3,
    "name": "Add page content",
    "description": "Add additional content blocks to a Notion page in your workspace using OpenAI.",
    "buttonText": "Add content",
    "icon": AddIcon
  },
  {
    "id": 4,
    "name": "Edit page content",
    "description": "Edit the content within a Notion page with OpenAI DaVinci.",
    "buttonText": "Edit content",
    "icon": EditIcon
  },
  {
    "id": 5,
    "name": "Generate a picture",
    "description": "Generate a picture with DALL-E and insert it into a Notion page within your workspace.",
    "buttonText": "Generate picture",
    "icon": SmallAddIcon
  },
  {
    "id": 6,
    "name": "Generate summary",
    "description": "Create a summary of a page or database entry with OpenAI, and add it to a page or database.",
    "buttonText": "Generate summary",
    "icon": SmallAddIcon
  },
  {
    "id": 7,
    "name": "Automatic Tagging",
    "description": "Intelligently generate tags with OpenAI based on a database entry's content.",
    "buttonText": "Generate tags",
    "icon": SmallAddIcon
  },
  {
    "id": 8,
    "name": "Content Analysis",
    "description": "Use OpenAI to analyze Notion content and draft summaries outlining common patterns.",
    "buttonText": "Analyze content",
    "icon": ChatIcon
  }
]