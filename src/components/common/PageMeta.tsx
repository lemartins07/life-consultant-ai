"use client";

import { useEffect } from "react";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
};

export default PageMeta;
