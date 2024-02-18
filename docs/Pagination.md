# Pagination component
Welcome to the NexaRize Pagination Component! This component provides a flexible and customizable solution for implementing pagination in your React applications. With this component, you can easily navigate through large datasets or paginated content with intuitive controls and a seamless user experience.

## Usage
To demonstrate the usage of the component, we'll illustrate its integration into a real project using React and TypeScript.

1. To style the pagination component, we'll start by designing our desired appearance. Following that, we'll create a custom component incorporating all the styles and classes you wish to apply, whether using CSS, Tailwind CSS, or other styling approaches.

```css
/* App.css */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 20px;
}

.pagination-button {
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  background-color: #008080;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.pagination-button-disabled {
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  background-color: #eee;
  color: #000;
  font-size: 16px;
  cursor: default;
}

.pagination-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.pagination-input {
  font-size: 16px;
  width: 40px;
  padding: 4px 8px;
  border: #eee 1px solid;
  border-radius: 4px;
}

.pagination-label {
  font-size: 16px;
}
```

```typescript
// CustomPagination.tsx
import { Pagination, PaginationStyles } from "nexa-components"; // Importing component and style interface

interface Props {
  total: number;
  label: string;
  txtPage: string;
  setTxtPage: (page: string) => void;
}

const CustomPagination = ({ total, txtPage, setTxtPage, label }: Props) => {
  // Pagination styles based on the App.css
  const paginationStyles: PaginationStyles = {
    container: "pagination",
    btn: "pagination-button",
    btn_disabled: "pagination-button-disabled",
    content: "pagination-content",
    input: "pagination-input",
    label: "pagination-label",
  };

  return (
    <Pagination
      total={total}
      label={label}
      txtPage={txtPage}
      setTxtPage={setTxtPage}
      styles={paginationStyles}
    />
  );
};

export default CustomPagination;
```

2. Next, let's review the data we'll utilize. We'll be retrieving data from the JSON Placeholder API, specifically from the [Post API](https://jsonplaceholder.typicode.com/posts). Here's the interface for the data:

```typescript
// IPost.ts
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  [key: string]: string | number;
}
```

3. Moving on to fetching data from the API, here's our approach:
```typescript
// post.service.ts
import { Post } from "../interfaces/IPost";     //Importing POST interface
import { IPagination } from "nexa-components";  //Importing pagination interface

export const list = async (page: string): Promise<IPagination<Post[]>> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  const data = await response.json();
  const totalCount = Number(response.headers.get("x-total-count"));
  const total = Math.ceil(totalCount / 10);

  return {
    data,
    total,
  };
};
```

4. With all the necessary components in place, we can now incorporate the pagination component. In this scenario, we'll combine the Table Component with the Pagination component to demonstrate how they work together:

```typescript
import CustomTable from "../CustomTable";
import CustomPagination from "../CustomPagination"; // Importing custom pagination component
import { useEffect, useState } from "react";
import { Post } from "../../interfaces/IPost";
import { list } from "../../services/post.services";
import { TableConfig, IPagination } from "nexa-components"; // Importing interfaces

const Posts = () => {
  const [data, setData] = useState<IPagination<Post[]>>({ data: [], total: 0 });
  const [page, setPage] = useState<string>("1");

  // Getting data from API
  const getPosts = async () => {
    try {
      const posts = await list(page);
      setData(posts);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // Table config
  const defaultRender = (item: Post, field: string) => (
    <div>{`${item[field]}`}</div>
  );

  const tableConfig: TableConfig<Post> = {
    id: {
      name: "ID",
      render: defaultRender,
    },
    title: {
      name: "Title",
      render: defaultRender,
    },
    body: {
      name: "Body",
      render: defaultRender,
    },
  };

  // Refetch the data when page change
  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <div>
      <CustomTable data={data.data} config={tableConfig} />

      /* Custom pagination component with all required props */
      <CustomPagination
        total={data.total}
        label={"de"}
        txtPage={page}
        setTxtPage={setPage}
      />
    </div>
  );
};

export default Posts;
```